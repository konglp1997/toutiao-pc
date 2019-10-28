<template>
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside :width="isOpen?'200px':'64px'">
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
        :router="true"
      >
        <!-- :collapse-transition="false"关闭动画 -->
        <!-- 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <span class="icon" :class="isOpen?'el-icon-s-fold':'el-icon-s-unfold'" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- //下拉菜单 -->

         <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img class="headIcon" src="../../assets/avatar.jpg" alt="">
            <span class="userName">用户名称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  //侧边栏
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
  }

  //头部
  .el-header {
     line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-dropdown-link {
      cursor: pointer;
    }

    .icon {
       font-size: 30px;
      vertical-align: middle;
    }
     .text {
      margin-left: 10px;
      vertical-align: middle;
    }

    .dropdown{
      float: right;
      .headIcon{
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin: left
      }
      .userName{
        font-weight: bold;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
}
</style>
