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
  font-family:MicrosoftYaHei;
  font-size: 12px;
}
#app {
  overflow-x: hidden;
}
</style>