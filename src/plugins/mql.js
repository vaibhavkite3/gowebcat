import axios from 'axios'
import Vue from 'vue'
import Response from '@/plugins/response.js'
// import pako from 'pako'
class MQL {
  constructor (strActivities = null) {
    let cancel

    let CancelToken = axios.CancelToken
    this.strActivities = strActivities
    this.isQuery = false
    this.isActivity = false
    this.fetchableMap = new Map()
    this.version = Vue.getVersion()
    this.region = Vue.getRegion()
    this.appCode = Vue.getAppCode()
    this.activityType = 'o'
    this.mqlString = '/mql'
    this.isConfirm = false
    this.showPageLoader = false
    const QueryActivityKey = 'FetchQueryData'

    const ActivitySplitter = '.['

    const ObjActivityNameKey = 'ActivityName'

    const ObjActivityData = 'Data'
    const mqlInstance = axios.create({
      baseURL: Vue.getBaseURL()
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
        if (config.url.indexOf('r/') !== -1) {
          // Check for restricted request
          if (sessionStorage.getItem('user-token') === null) {
            cancel('Operation canceled by the MQL interceptor.')
            // TODO: Uncomment below code for dispatch
            // window.app.$store.dispatch('AUTH_LOGOUT')
          }
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    // mqlInstance.interceptors.response.use(
    //   function (config) {
    //     if (config.url.indexOf('r/') !== -1) {
    //       // Check for restricted request
    //       if (sessionStorage.getItem('user-token') === null) {
    //         cancel('Operation canceled by the MQL interceptor.')
    //         //TODO: Uncomment below code for dispatch
    //         // window.app.$store.dispatch('AUTH_LOGOUT')
    //       }
    //     }
    //     return config
    //   },
    //   function (error) {
    //     return Promise.reject(error)
    //   }
    // )
    this.formatActivity = function (activityStr) {
      let activityArray = []
      this.activityType = activityStr.split(ActivitySplitter)[0]
      this.fetchableMap.set('ActivityType', this.activityType)
      activityArray = activityStr
        .split(ActivitySplitter)[1]
        .substring(0, activityStr.split(ActivitySplitter)[1].length - 1)
        .split(',')
      activityArray.map(item => {
        let obj = {}

        let srvName
        obj[ObjActivityData] = null
        if (item.match(/query_/) !== null && item.match(/query_/).length > 0) {
          obj[item] = item.trim()
          srvName = item.trim()
          this.isQuery = true
        } else {
          obj[ObjActivityNameKey] = item.trim()
          srvName = item.trim()
          this.isActivity = true
        }
        this.fetchableMap.set(srvName, obj)
      })
    }
    this.deepFreeze = object => {
      // Retrieve the property names defined on object
      var propNames = Object.getOwnPropertyNames(object)
      // Freeze properties before freezing self
      for (let name of propNames) {
        let value = object[name]
        object[name] =
          value && typeof value === 'object' ? this.deepFreeze(value) : value
      }
      return Object.freeze(object)
    }
    this.generateURL = (activityType, customURL) => {
      if (customURL != null && customURL !== undefined) {
        return (
          customURL +
          this.getVersion() +
          this.getRegion() +
          this.getAppCode() +
          this.getServiceURL(activityType)
        )
      } else {
        return (
          this.getVersion() +
          this.getRegion() +
          this.getAppCode() +
          this.getServiceURL(activityType)
        )
      }
    }
    this.getServiceURL = activityType => {
      return (
        (activityType.toLowerCase() === 'c'
          ? 'r/' + activityType.toLowerCase()
          : activityType.toLowerCase()) + this.mqlString
      )
    }
    this.generateHeaders = (
      activityType,
      activities,
      headers = {},
      isQuery = false
    ) => {
      headers['Service-Header'] = isQuery ? QueryActivityKey : activities
      if (activityType !== 'o') {
        headers['Authorization'] =
          'Bearer ' + sessionStorage.getItem('user-token')
      }
      return headers
    }
    this.getVersion = function () {
      return this.version != null || this.version !== undefined
        ? this.version + '/'
        : ''
    }
    this.getRegion = function () {
      return this.region != null || undefined !== this.region
        ? this.region + '/'
        : ''
    }
    this.getAppCode = function () {
      return this.appCode != null || this.appCode !== undefined
        ? this.appCode + '/'
        : ''
    }
    /* Setter methods */
    this.setActivity = function (strActivities = null) {
      this.strActivities = strActivities
      this.formatActivity(this.strActivities)
      return this
    }
    this.setData = function (strActivity = null, strDataObj = null) {
      if (strActivity === null) {
        console.error('Data cannot be null')
      } else if (strDataObj === null) {
        // common data
        for (let [key, value] of this.fetchableMap) {
          if (value[ObjActivityData] === null) {
            value[ObjActivityData] = strActivity
            this.fetchableMap.set(key, value)
          }
        }
      } else {
        // service specific
        let activityValue = this.fetchableMap.get(strActivity)
        activityValue[ObjActivityData] = strDataObj
        this.fetchableMap.set(strActivity, activityValue)
      }
      return this
    }
    this.setHeader = function (obj_header = {}) {
      this.fetchableMap.set('Header', obj_header)
      return this
    }
    this.setCustomURL = function (str_customURL = null) {
      this.fetchableMap.set('CustomURL', str_customURL)
      return this
    }
    this.showConfirmDialog = function (boolConfirmation = false) {
      this.isConfirm = boolConfirmation
      return this
    }
    this.enablePageLoader = function (boolShowPageLoader = false) {
      this.showPageLoader = boolShowPageLoader
      return this
    }
    this.setLoginActivity = function () {
      this.setActivity('o.[MQLLogin]')
      // this.setCustomURL('/o/mql/login')
      // this.activityType = ''
      // this.mqlString = ''
      return this
    }
    this.fetch = function (docId = null) {
      return new Promise((resolve, reject) => {
        let self = this
        if (this.isConfirm) {
          Vue.dialog
            .confirm('Please confirm to continue')
            .then(function () {
              let rs = self.run(
                docId,
                self.isQuery,
                self.isActivity,
                self.fetchableMap,
                self.activityType
              )
              resolve(rs)
            })
            .catch(function () {
              let obj = {}
              obj.data = {}
              obj.data.error = 'Canceled by user'
              obj.data.errorCode = 1990
              obj.data.result = null
              // eslint-disable-next-line prefer-promise-reject-errors
              resolve(new Response(obj))
            })
        } else {
          let rs = self.run(
            docId,
            self.isQuery,
            self.isActivity,
            self.fetchableMap,
            self.activityType
          )
          resolve(rs)
        }
      })
    }
    this.run = function (
      docId = null,
      isQuery = false,
      isActivity = false,
      fetchableMap = null,
      activityType = 'o'
    ) {
      return new Promise((resolve) => {
        // TODO: seperate this in new function
        let txt = 'Processing'
        if (this.showPageLoader) {
          window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
        }
        if (docId !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        let postParamObject = {}
        let activities = ''
        if (isQuery && isActivity) {
          let obj = {}
          obj.data = {}
          obj.data.error = 'Can not support query and activity in a single execution'
          obj.data.errorCode = 1990
          obj.data.result = null

          resolve(new Response(obj))
        } else {
          fetchableMap.set('isQuery', isQuery)
        }
        let payloadObject = {}
        for (var [key, value] of fetchableMap) {
          if (
            key.search('ActivityType') < 0 &&
            key.search('Header') < 0 &&
            key.search('CustomURL') < 0 &&
            key.search('isQuery') < 0
          ) {
            activities = activities + ',' + key
            // eslint-disable-next-line standard/computed-property-even-spacing
            payloadObject[
              key.match(/query_/) !== null && key.match(/query_/).length > 0
                ? key.substring('query_'.length, key.length)
                : key
            ] = value.Data
          }
        }
        if (this.isQuery) {
          payloadObject['fetchGroup'] = activities
            .substring(1, activities.length)
            .split(',')
            .map(item => {
              return item.substring('query_'.length, item.length)
            })
          postParamObject[QueryActivityKey] = payloadObject
        } else {
          postParamObject = payloadObject
        }
        mqlInstance({
          url: this.generateURL(activityType, fetchableMap.get('CustomURL')),
          method: 'Post',
          headers: this.generateHeaders(
            activityType,
            activities.substring(1, activities.length),
            fetchableMap.get('Header'),
            isQuery
          ),
          data: postParamObject,
          cancelToken: new CancelToken(function executor (c) {
            cancel = c
          })
        })
          .then(res => {
            if (docId !== null) {
              document.getElementById(docId).disabled = false
              document.getElementById(docId).innerHTML = txt
            }
            if (this.showPageLoader) {
              window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
            }
            resolve(new Response(res))
          })
          .catch(error => {
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
      })
    }
  }
}

export default MQL
