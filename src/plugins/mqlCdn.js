import axios from 'axios'
import Response from '@/plugins/response.js'
import Vue from 'vue'

class MQLCdn {
  constructor () {
    let cancel
    this.fileName = ''
    this.formData = new FormData()
    this.formData.set('enctype', 'multipart/form-data')
    // this.clientID = ''
    this.clientId = ''
    this.bucketName = ''
    this.isPrivateBucket = false
    this.cdnURL = ''
    this.cdnPath = ''
    this.showPageLoader = false
    let CancelToken = axios.CancelToken
    const mqlInstance = axios.create({
      baseURL: Vue.getCDNBaseURL()
      // transformRequest: axios.defaults.transformRequest.concat(
      //   function (data, headers) {
      //     // compress strings if over 1KB
      //     if (typeof data === 'string' && data.length > 10) {
      //       headers['Content-Encoding'] = 'gzip';
      //       return pako.gzip(data);
      //     } else {
      //       // delete is slow apparently, faster to set to undefined
      //       //headers['Content-Encoding'] = undefined;
      //       return data;
      //     }
      //   }
      // )
    })
    mqlInstance.interceptors.request.use(
      function (config) {
        // TODO: check for private bucket(not required.)
        // if (config.url.indexOf('r/') !== -1) {
        // Check for restricted request
        if (sessionStorage.getItem('user-token') === null) {
          cancel('Operation canceled by the MQLCDN interceptor.')
          // TODO Uncomment below code for dispatch
          // window.app.$store.dispatch('AUTH_LOGOUT')
        }
        // }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    const setHeaders = (headers = {}) => {
      headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('user-token')
      return headers
    }

    this.uploadFile = (docId = null) => {
      this.cdnURL = this.clientId + '/uploadFile'
      let txt = ''
      if (this.showPageLoader) {
        window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
      }
      return new Promise((resolve) => {
        if (docId !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        prepareMQLCDNRequest('POST', docId, txt).then(cdnResponse => {
          if (this.showPageLoader) {
            window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
          }
          resolve(cdnResponse)
        })
      })
    }

    this.downloadFile = (docId = null) => {
      if (this.cdnPath.includes('http://') || this.cdnPath.includes('https://')) {
        // if full path is  available
        this.cdnURL = this.cdnPath
      } else {
        // add cdnbase url.
        this.cdnURL = Vue.getCDNBaseURL() + this.cdnPath
      }
      let txt = ''
      if (this.showPageLoader) {
        window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
      }
      if (docId !== null) {
        txt = document.getElementById(docId).innerHTML
        document.getElementById(docId).disabled = true
        document.getElementById(docId).innerHTML = 'Processing'
      }
      return new Promise((resolve) => {
        if (this.clientId !== undefined) {
          mqlInstance({
            url: this.cdnURL,
            method: 'GET',
            headers: setHeaders(),
            responseType: 'blob',
            cancelToken: new CancelToken(function executor (c) {
              cancel = c
            })
          })
            .then(res => {
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              if (docId !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              this.fileName = getFilenameFromUrl(this.cdnURL)
              const url = window.URL.createObjectURL(new Blob([res.data]))
              var a = document.createElement('a')
              a.href = url
              a.download = this.fileName
              a.target = '_blank'
              a.click()
            })
            .catch(error => {
              console.log('fail error', error.message)
              let obj = {}
              obj.data = {}
              if (docId !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              obj.data.error = error.message
              obj.data.errorCode = 1990
              obj.data.result = null
              resolve(new Response(obj))
            })
        } else {
          if (docId !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          let obj = {}
          obj.data = {}
          obj.data.error = 'Invalid Bucket Key...' + this.bucketName
          obj.data.errorCode = 1990
          obj.data.result = null
          if (docId !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          if (this.showPageLoader) {
            window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
          }
          resolve(new Response(obj))
        }
      })
    }

    const getFilenameFromUrl = (url) => {
      const pathname = new URL(url).pathname
      const index = pathname.lastIndexOf('/')
      return (index !== -1 ? pathname.substring(index + 1) : pathname)
    }
    this.setFileName = (fileName) => {
      if (fileName !== '' && fileName !== undefined) {
        this.fileName = fileName.trim()
        this.formData.append('fileName', this.fileName)
      } else {
        this.fileName = ''
      }
      return this
    }

    this.setCDNPath = (cdnPath) => {
      this.cdnPath = cdnPath
      return this
    }

    this.setFormData = (formData) => {
      this.formData = formData
      return this
    }

    this.enablePageLoader = function (boolShowPageLoader = false) {
      this.showPageLoader = boolShowPageLoader
      return this
    }

    this.setBucketKey = (bucketName) => {
      this.bucketName = bucketName
      // console.log('setBucketKey called..')
      fetchBucketIdFromKey(bucketName)
      return this
    }
    const fetchBucketIdFromKey = (bucketName) => {
      let bucketObj = Vue.getBucketIdByKey(bucketName)
      if (bucketObj === undefined) {
        this.clientId = undefined
      } else {
        this.clientId = bucketObj.clientId
        this.isPrivateBucket = bucketObj.isPrivateBucket
        // console.log('this.isPrivateBucket result', this.isPrivateBucket)
      }
      // console.log('setBucketId result', this.clientId)
    }
    const prepareMQLCDNRequest = (requestType, docId, txt) => {
      return new Promise((resolve) => {
        if (this.clientId !== undefined) {
          mqlInstance({
            url: this.cdnURL,
            method: requestType,
            headers: setHeaders(),
            data: this.formData,
            cancelToken: new CancelToken(function executor (c) {
              cancel = c
            })
          })
            .then(res => {
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              if (docId !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              let obj = {}
              obj.data = {}
              // obj.data.error = 'Invalid Bucket Key...'
              obj.data.errorCode = 1000
              obj.data.result = res.data
              resolve(new Response(obj))
            })
            .catch(error => {
              console.log('fail error', error.message)
              let obj = {}
              obj.data = {}
              if (docId !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              obj.data.error = error.message
              obj.data.errorCode = 1990
              obj.data.result = null
              resolve(new Response(obj))
            })
        } else {
          if (docId !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          let obj = {}
          obj.data = {}
          obj.data.error = 'Invalid Bucket Key ' + this.bucketName
          obj.data.errorCode = 1990
          obj.data.result = null
          resolve(new Response(obj))
        }
      })
    }
  }
}
export default MQLCdn
