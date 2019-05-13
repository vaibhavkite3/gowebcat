<template>
  <div>
    <label for="logsPath">Logs path</label>
    <select id="id_logspath" v-model="logsPath" @change="getFileList">
      <option v-for="lp in lps" v-bind:key="lp" v-bind:value="lp">{{ lp }}</option>
    </select>
    <label for="logsPath">Extension</label>
    <select id="id_extension" v-model="extension" @change="getFileList">
      <option v-for="extn in extns" v-bind:key="extn" v-bind:value="extn">{{ extn }}</option>
    </select>

    <label for="logsPath">Modified Time</label>
    <select id="id_modifiedTime" v-model="modifiedTime" @change="getFileList">
      <option v-for="mtime in mtimes" v-bind:key="mtime" v-bind:value="mtime">{{ mtime }}</option>
    </select>

    <label for="logsPath">Log File</label>
    <select id="id_logFile" v-model="logFile">
      <option v-for="lf in lfs" v-bind:key="lf" v-bind:value="lf">{{ lf }}</option>
    </select>

    <input type="text" id="id_nolines" v-model="noLines" value="10" size="10">

    <input type="radio" v-model="viewType" value="head">
    <label for="viewtype">Head</label>
    <input type="radio" v-model="viewType" value="tail">
    <label for="viewtype">Tail</label>

    <button @click="viewFileData">View</button>
     | 
    <button> |> Follow </button>
    <button>stop</button>
    <pre>{{ fileData }}</pre>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fileData : null,
      logsPath: null,
      extension: null,
      modifiedTime: null,
      logFile: null,
      noLines: 10,
      viewType: "tail",
      lps: [],
      extns: [],
      mtimes: [],
      lfs: []
    };
  },
  mounted() {
    var self = this;
    axios
      .post("fserver/getfolderlistextn")
      .then(function(response) {
        self.lps = response.data.logspaths;
        self.extns = response.data.extn;
        self.mtimes = response.data.mtimes;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    
    viewFileData() {
      var self = this;
      let formData = new FormData();
      formData.append('filename',self.logFile);
      formData.append('numberoflines',self.noLines);
      formData.append('viewtype',self.viewType)
      axios
        .post("fserver/getfiledata", formData)
        .then(function(response) {
          self.fileData = response.data.filedata;
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
        .post("fserver/getfilelist", formData)
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
