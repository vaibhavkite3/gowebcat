/* HTTP Web Based file viewer CAT */

package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

var filedata string
var filename string
var numberoflines string
var viewtype string

//Read file
func readfile(filen string) string {
	filedata := ""
	file, err := os.Open(filen)
	if err != nil {
		log.Print(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		//fmt.Println(scanner.Text())
		filedata += scanner.Text() + "\n"
	}

	if err := scanner.Err(); err != nil {
		log.Print(err)
	}

	return filedata
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

		c.JSON(200, gin.H{
			"status":        "OK",
			"filename":      filename,
			"numberoflines": numberoflines,
			"viewtype":      viewtype,
			"filedata":      readfile(filename),
		})

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
