/* HTTP Web Based file viewer CAT */

package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

var filename string
var numberoflines string
var viewtype string
var viewcmd string

//Read file
func readfile(cmd string, filen string, noflines string) (string, error) {

	file, err := os.Open(filen)
	if err != nil {
		log.Println(err)
		return "", err
	}
	defer file.Close()

	out, err := exec.Command(cmd, "-n", noflines, filen).Output()
	if err != nil {
		log.Println(err)
		return "", err
	}
	//fmt.Printf("The file data is %s\n", out)

	return string(out), nil
}

func main() {

	viper.SetConfigName("config") // name of config file (without extension)
	viper.AddConfigPath(".")      // optionally look for config in the working directory
	err := viper.ReadInConfig()   // Find and read the config file
	if err != nil {               // Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %s \n ", err))
	}

	// Reading values from config file
	extn := viper.GetString("allowedextensions")
	addrport := viper.GetString("addressport")
	fmt.Println(extn)
	fmt.Println(addrport)

	// init and run HTTP server
	router := gin.Default()

	// Serve static files
	router.Static("/dist", "./dist")

	//Load HTML Files
	router.LoadHTMLGlob("dist/*")

	// POST func
	router.POST("/getFileData", func(c *gin.Context) {

		filename := c.PostForm("filename")
		numberoflines := c.PostForm("numberoflines")
		viewtype := c.PostForm("viewtype")

		if viewtype == "cat" {
			viewcmd = "/bin/cat"
		} else if viewtype == "head" {
			viewcmd = "/usr/bin/head"
		} else if viewtype == "tail" {
			viewcmd = "/usr/bin/tail"
		} else {
			viewcmd = "/bin/cat"
		}

		data, err := readfile(viewcmd, filename, numberoflines)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":   "ERROR",
				"filename": filename,
				"error":    err,
			})

		} else {

			c.JSON(http.StatusOK, gin.H{
				"status":        "OK",
				"filename":      filename,
				"numberoflines": numberoflines,
				"viewtype":      viewtype,
				"filedata":      data,
			})
		}

		fmt.Printf("\nFile name: %s\n", filename)
		fmt.Printf("No of Lines: %s\n", numberoflines)
		fmt.Printf("View Type: %s\n", viewtype)

	})

	//GET Func
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "GO WEB CAT",
		})
	})

	//RUN HTTP Server
	router.Run(addrport)

}
