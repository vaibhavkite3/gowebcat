// Don't do changes in this file
// All .js file in modules directory are get registered in vuex/store
// with first letter of file as upper-case e.g camelCase.js -> CamelCase
import upperFirst from 'lodash/upperFirst'

const requireModule = require.context('.', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  // Don't register this file as a Vuex module
  if (fileName === './modules.js') return

  const moduleName = upperFirst(
    fileName.replace(/(\.\/|\.js)/g, '')
  )
  modules[moduleName] = requireModule(fileName)
})

export default modules
