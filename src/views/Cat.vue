<template>
    <b-container fluid>
      <br />
        <b-row align-v="center"> 
          <b-col cols="4">
            <label for="logsPath">Logs Path</label>
            <!-- <b-form-select v-model="logsPath" :options="lps"></b-form-select> -->
            <select class="form-control" id="id_extension" v-model="logsPath" @change="getFileList">
              <option v-for="lp in lps" v-bind:key="lp" v-bind:value="lp">{{ lp }}</option>
            </select>
          </b-col>
          <b-col  cols="2">
            <label for="logsPath">Extension</label>
            <select class="form-control" id="id_extension" v-model="extension" @change="getFileList">
              <option v-for="extn in extns" v-bind:key="extn" v-bind:value="extn">{{ extn }}</option>
            </select>
          </b-col>
          <b-col  cols="2">
            <label for="modtime">Modified Time</label>
            <select class="form-control" id="id_modifiedTime" v-model="modifiedTime" @change="getFileList">
              <option v-for="mtime in mtimes" v-bind:key="mtime" v-bind:value="mtime">{{ mtime }}</option>
            </select>
          </b-col>
          <b-col cols="2">
            <label for="nolines">No. of Lines</label>
            <input class="form-control" type="text" id="id_nolines" v-model="noLines" value="10" size="5">
          </b-col>
          <b-col cols="2">
            <label for="nolines">View Log From</label>
                <b-form-radio-group
                  id="btn-radios-2"
                  v-model="viewType"
                  :options="viewoptions"
                  buttons
                  button-variant="outline-info"
                  size="md"
                  name="radio-btn-outline"
                ></b-form-radio-group> 
          </b-col>
        </b-row>
      
      <b-row align-v="center">
        <b-col cols="8">
          <label for="logsPath">Log File</label>
          <b-form-select v-model="logFile" :options="lfs" @change="getFileSize"></b-form-select>
        </b-col>

        <b-col cols="2" class="mt-4"><button class="btn btn-success btn-block" @click="viewFileData">View</button></b-col>
        <b-col cols="2" class="mt-4"><a class="text-decoration-none" @click.prevent="downloadItem(logFile)" :href="logFile">
<button :disabled="isDisabled" class="btn btn-danger btn-block">Download <b-badge variant="light">{{ filesize }} KB</b-badge></button></a></b-col>
      </b-row>
      <br/>
      
      <div class="console">
        <div class="consolebody">
          <pre>{{ fileData }}</pre>
        </div>
      </div>

    </b-container>
    
</template>

<style scoped>

.console {
  /* font-family: 'Fira Mono'; */
  width: 100%;
  box-sizing: border-box;
  margin: auto;
}

pre {
    display: block;
    color: white;
}

.console .consolebody {
  background-color: #000;
}

</style>


<script>
import axios from "axios";
let path = require('path')
export default {
  data() {
    return {
      fileData : null,
      filesize: null,
      logsPath: null,
      extension: null,
      modifiedTime: null,
      logFile: null,
      noLines: 10,
      viewType: "tail",
      lps: [],
      extns: [],
      mtimes: [],
      lfs: [],
      viewoptions: [
          { text: 'Head', value: 'head' },
          { text: 'Tail', value: 'tail' },
        ]
    };
  },
  mounted() {
    var self = this;
    axios
      .post("getfolderlistextn")
      .then(function(response) {
        self.lps = response.data.logspaths;
        self.extns = response.data.extn;
        self.mtimes = response.data.mtimes;
      })
      .catch(function(error) {
        console.log(error);
      });
  },

   computed: {
  	isDisabled: function(){
    	return this.filesize > 10240;
    }
  },

  methods: {

    downloadItem (url) {
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const burl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = burl;
        var fname =  path.basename(url)
        link.setAttribute('download', fname);
        document.body.appendChild(link);
        link.click();
      })
  },
    
    viewFileData() {
      var self = this;
      let formData = new FormData();
      formData.append('filename',self.logFile);
      formData.append('numberoflines',self.noLines);
      formData.append('viewtype',self.viewType)
      axios
        .post("getfiledata", formData)
        .then(function(response) {
          self.fileData = response.data.filedata;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getFileSize() {
      var self = this;
      let formData = new FormData();
      formData.append('filenamewithpath',self.logFile);
      axios
        .post("getfilesize", formData)
        .then(function(response) {
          self.filesize = response.data.filesize;

        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getFileList() {
      var self = this;
      let formData = new FormData();
      formData.append('folderpath',self.logsPath);
      formData.append('extn',self.extension);
      axios
        .post("getfilelist", formData)
        .then(function(response) {
          self.lfs = response.data.files;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
