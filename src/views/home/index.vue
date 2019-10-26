<template>
  <el-container class="container">
    <el-aside width="200px"></el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold icon"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
      </el-header>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .el-aside {
    background: #002033;
  }

  .el-header {
    border-bottom: 1px solid #ddd;
  }
}
</style>
