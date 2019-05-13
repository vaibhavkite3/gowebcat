<template>
  <div id="app">

    <div id="header">
      <img src="">
      
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app-loader {
  position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: rgba(255,255,255,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
