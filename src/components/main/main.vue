<template>
  <div id="main">
    <el-container style="min-width:1366px;height:100vh">
      <el-main style="padding-top:0" id="mainBody">
        <el-card>
          <router-view />
        </el-card>
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
body{
  overflow-y:hidden;
  overflow-x:hidden;
}
</style>
