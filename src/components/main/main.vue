<template>
  <div id="main">
    <el-container style="min-width:1366px;height:100vh">
      <el-main style="padding:0" id="mainBody">
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
