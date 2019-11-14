<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style lang="less">
html {
  width: 100%;
  height: 100%;
  font-family:MicrosoftYaHei;
  font-size: 12px;
  body{
    width: 100%;
    height: 100%;
  }
}
#app {
  min-width: 1366px;
  min-height: 750px;
  height: 100%;
}
</style>