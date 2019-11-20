<template>
  <div id="main">
    <el-container style="min-width:1366px;">
      <el-main style="padding:0">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'home'
}
</script>
<style lang="less">
.el-main {
  height: auto!important;
}
</style>
