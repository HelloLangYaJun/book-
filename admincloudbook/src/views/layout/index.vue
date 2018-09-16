<template>
  <div class="container">
    <header class="title">
      <h2>云书后台</h2>
      <div class="setting">
        <el-col :span="12">
          <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="userInfo" alt="">
            <span>设置</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登陆</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>修改个人信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </div>
    </header>
    <div class="sidebar">
      <el-menu
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index="/layout/index">首页</el-menu-item>
            <el-menu-item index="/">登陆</el-menu-item>
            <el-menu-item index="/layout/users">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/layout/swiper">
          <i class="el-icon-menu"></i>
          <span slot="title">轮播设置</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>图书管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">设置</template>
            <el-menu-item index="/layout/classify">分类管理</el-menu-item>
            <el-menu-item index="/layout/books">所有图书</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        userInfo: this.$loginUser
      }
    },
    created() {
      console.log(this.$loginUser)
    }
  }
</script>

<style scoped lang="scss">
  .title {
    margin-left: 200px;
    line-height: 60px;
    height: 60px;
    border-bottom: 1px solid #e1e1e1;
  }

  .sidebar {
    position: fixed;
    background-color: #545c64;
    width: 200px;
    height: 100vh;
    top: 0;
  }
 .title{
   display: flex;
   justify-content: space-between;
   h2{
     width: 100%;
   }
   .setting{
     width: 200px;
   }
 }
  .main-content {
    margin-left: 220px;
  }
</style>
