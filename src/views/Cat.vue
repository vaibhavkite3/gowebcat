<template>
    <b-container>
      <br />
        <b-row align-v="center"> 
          <b-col cols="3">
            <label for="logsPath">Logs Path</label>
            <b-form-select v-model="logsPath" :options="lps"></b-form-select>
          </b-col>
          <b-col  cols="2">
            <label for="logsPath">Extension</label>
            <select class="form-control" id="id_extension" v-model="extension" @change="getFileList">
              <option v-for="extn in extns" v-bind:key="extn" v-bind:value="extn">{{ extn }}</option>
            </select>
          </b-col>
          <b-col  cols="2">
            <label for="logsPath">Modified Time</label>
            <select class="form-control" id="id_modifiedTime" v-model="modifiedTime" @change="getFileList">
              <option v-for="mtime in mtimes" v-bind:key="mtime" v-bind:value="mtime">{{ mtime }}</option>
            </select>
          </b-col>
          <b-col cols="2">
            <label for="nolines">No. of Lines</label>
            <input class="form-control" type="text" id="id_nolines" v-model="noLines" value="10" size="10">
          </b-col>
          <b-col cols="2">
            <label for="nolines">View Type</label>
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
        <b-col cols="9">
          <label for="logsPath">Log File</label>
          <b-form-select v-model="logFile" :options="lfs"></b-form-select>
        </b-col>

        <b-col cols="2" class="mt-4"><button class="btn btn-primary btn-block" @click="viewFileData">View</button></b-col>
        <b-col cols="1" class="mt-4"><button class="btn btn-success btn-block">Follow</button></b-col>
      </b-row>
      <br/>
    <pre>{{ fileData }}</pre>
    </b-container>
    
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
  methods: {
    
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
