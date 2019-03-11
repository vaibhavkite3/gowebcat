/* HTTP Web Based file viewer CAT */

package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

var filename string
var numberoflines string
var viewtype string
var viewcmd string
var extension string
var extnallowedflag bool
var validationflag bool

// FUNC : To get extention of file
func getextn(filen string) string {
	extn := filepath.Ext(filen)
	return extn
}

// FUNC : To list files in folder

func listfiles(folderpath string, findbin string, mtime string, headbin string, ext string, maxls int) (string, error) {
	var cmdstr = ""
	maxlsint := strconv.Itoa(maxls)
	if ext == "*" || ext == "" && mtime == "*" || mtime == "" {
		cmdstr = findbin + " " + folderpath + " | " + headbin + " -n " + maxlsint
	} else if ext == "*" || ext == "" && mtime != "" {
		cmdstr = findbin + " " + folderpath + " -mtime " + mtime + " | " + headbin + " -n " + maxlsint
	} else if mtime == "*" || mtime == "" && ext != "" {
		cmdstr = findbin + " " + folderpath + " -name *" + ext + " | " + headbin + " -n " + maxlsint
	} else {
		cmdstr = findbin + " " + folderpath + " -name *" + ext + " -mtime " + mtime + " | " + headbin + " -n " + maxlsint
	}

	fmt.Printf("%s", cmdstr)
	cout, cerr := exec.Command("bash", "-c", cmdstr).Output()
	if cerr != nil {
		log.Println(cerr)
		return "", cerr
	}
	return string(cout), nil
}

// FUNC : To read file content
func readfile(cmd string, filen string, noflines string, extn string, zcbin string, catbin string) (string, error) {

	file, err := os.Open(filen)
	if err != nil {
		log.Println(err)
		return "", err
	}
	defer file.Close()

	//read compressed file
	if extn == ".gz" {
		cmdstr := zcbin + " " + filen + " | " + cmd + " -n " + noflines + " | " + catbin + " -n"
		cout, cerr := exec.Command("bash", "-c", cmdstr).Output()
		if cerr != nil {
			log.Println(cerr)
			return "", cerr
		}

		return string(cout), nil

	}
	{
		cmdstr := cmd + " -n " + noflines + " " + filen + " | " + catbin + " -n"
		cout, cerr := exec.Command("bash", "-c", cmdstr).Output()
		if cerr != nil {
			log.Println(cerr)
			return "", cerr
		}
		return string(cout), nil

	}

}

// FUNC : Main function execution
func main() {

	// initialization of config file
	viper.SetConfigName("config") // name of config file (without extension)
	viper.AddConfigPath(".")      // optionally look for config in the working directory
	err := viper.ReadInConfig()   // Find and read the config file
	if err != nil {               // Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %s \n ", err))
	}

	// Reading values from config file

	addressport := viper.GetString("addressport")
	catbinary := viper.GetString("catbinary")
	headbinary := viper.GetString("headbinary")
	tailbinary := viper.GetString("tailbinary")
	zcatbinary := viper.GetString("zcatbinary")

	// init and run HTTP server
	router := gin.Default()

	// Serve static files
	router.Static("/dist", "./dist")

	//Load HTML Files
	router.LoadHTMLGlob("dist/*")

	// POST func serve file data
	router.POST("/getfiledata", func(c *gin.Context) {

		//reset validation flag
		validationflag = true
		extnallowedflag = false

		//read config data
		allowedextensions := viper.GetStringSlice("allowedextensions")
		maxlinestoread := viper.GetInt("maxlinestoread")

		//Read POST data
		filename := c.PostForm("filename")
		numberoflines := c.PostForm("numberoflines")
		nos, _ := strconv.Atoi(numberoflines)
		viewtype := c.PostForm("viewtype")

		//decide which binary to use
		if viewtype == "head" {
			viewcmd = headbinary
		} else if viewtype == "tail" {
			viewcmd = tailbinary
		} else {
			viewcmd = catbinary
		}

		//get file extension
		extension := getextn(filename)

		//perform file read validations
		//1. Check number of lines
		if nos > maxlinestoread {
			//then return error
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":   "ERROR",
				"filename": filename,
				"error":    "cannot read file with that number of lines, Please provide less lines or change config",
			})
			validationflag = false
		}

		//2. Check if extension is allowed
		for e := 0; e < len(allowedextensions); e++ {

			if allowedextensions[e] == extension || allowedextensions[e] == "*" {
				extnallowedflag = true
			}

		}

		if extnallowedflag == false {
			//responce if error in JSON format
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":    "ERROR",
				"filename":  filename,
				"extension": extension,
				"error":     "this file extension is not allowed",
			})
			validationflag = false
		}

		//read file and responce only if validation pass
		if validationflag != false {
			// CALL readfile FUNC
			data, err := readfile(viewcmd, filename, numberoflines, extension, zcatbinary, catbinary)

			//Responce to POST
			if err != nil {
				//responce if error in JSON format
				c.JSON(http.StatusInternalServerError, gin.H{
					"status":   "ERROR",
					"filename": filename,
					"error":    err,
				})

			} else {
				//responce the file data in JSON format
				c.JSON(http.StatusOK, gin.H{
					"status":        "OK",
					"filename":      filename,
					"numberoflines": numberoflines,
					"viewtype":      viewtype,
					"filedata":      data,
				})
			}
		}

		fmt.Printf("\nFile name: %s\n", filename)
		fmt.Printf("No of Lines: %s\n", numberoflines)
		fmt.Printf("View Type: %s\n", viewtype)
		fmt.Printf("File extension is: %s\n", extension)

	})

	//POST func to serve dir list
	router.POST("/getfolderlistextn", func(c *gin.Context) {
		//Read log paths from config
		logspaths := viper.GetStringSlice("logspaths")
		allowedextensions := viper.GetStringSlice("allowedextensions")
		mtimes := viper.GetStringSlice("mtimes")

		//Responce folder list with JSON
		c.JSON(http.StatusOK, gin.H{
			"status":    "OK",
			"logspaths": logspaths,
			"extn":      allowedextensions,
			"mtimes":    mtimes,
		})
	})

	//POST func to serve file list from requested folder
	router.POST("/getfilelist", func(c *gin.Context) {
		//Read bin paths from config
		headbinary := viper.GetString("headbinary")
		findbinary := viper.GetString("findbinary")
		maxfilelistsize := viper.GetInt("maxfilelistsize")

		//Read POST data
		folderpath := c.PostForm("folderpath")
		extn := c.PostForm("extn")
		mtime := c.PostForm("mtime")

		data, err := listfiles(folderpath, findbinary, mtime, headbinary, extn, maxfilelistsize)

		//Responce to POST
		if err != nil {
			//responce if error in JSON format
			c.JSON(http.StatusInternalServerError, gin.H{
				"status": "ERROR",
				"error":  err,
			})
		} else {
			//Responce files list with JSON
			c.JSON(http.StatusOK, gin.H{
				"status": "OK",
				"files":  data,
			})
		}
	})

	//GET Func
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "GO WEB CAT",
		})
	})

	//RUN HTTP Server
	router.Run(addressport)

}
