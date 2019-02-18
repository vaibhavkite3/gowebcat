/* HTTP Web Based file viewer CAT */

package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/spf13/viper"
)

// http server handler function
func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there")
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
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(addrport, nil))
}
