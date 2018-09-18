<template>
  <div class="container">
    <header class="title">
      <h2>云书后台</h2>
      <div class="setting">
        <el-col :span="12">
          <el-dropdown>
          <span class="el-dropdown-link">
            <span>欢迎您：{{userInfo.username}}  <img :src="userInfo.avatar" alt=""></span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><p @click="logout">退出登陆</p></el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <p @click="centerDialogVisible2 = true">
                <el-dropdown-item  >修改个人信息</el-dropdown-item>
              </p>

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
      </el-menu>
    </div>
    <div class="main-content">
      <router-view/>
    </div>


    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible2"
      width="40%"
      center>
      <div class="content">
        用户名： <el-input v-model="newmanagerinfo.username" placeholder="例：Langyajun" type="text" disabled="disabled" ></el-input>
        邮箱： <el-input v-model="newmanagerinfo.email" placeholder="13366475**@qq.com" type="text"></el-input>
        昵称：<el-input v-model="newmanagerinfo.nickname" placeholder="落叶秋风" type="text"></el-input>
        个人介绍：<el-input v-model="newmanagerinfo.desc" placeholder="吃我一招big Bar"  type="textarea" :rows="3"></el-input>
        头像：<el-upload
        class="my-uploader"
        action="https://upload-z1.qiniup.com"
        :show-file-list="false"
        :data="ToKen"
        :on-success="handleAvatarSuccess">
        <img v-if="newmanagerinfo.avatar" :src="newmanagerinfo.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
        <el-input v-model="newmanagerinfo.avatar" placeholder="头像地址" type="text"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
     </span>
    </el-dialog>
    <!--......................分割线修改个人信息.............................-->
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  export default {
    name: "index",
    data() {
      return {
        userInfo: {},
        newmanagerinfo:{
          avatar: '',
          username: '',
          nickname: '',
          desc: '',
          email: ''
        },
        ToKen:'',
        centerDialogVisible2: false,
      }
    },
    methods: {
      logout() {
        this.$axios.get('/logout').then(res => {
          if (res.code == 200) {
            this.$message({
              message: '退出登陆成功',
              type: 'success'
            });
            this.$router.push('/')
          }
          else {
            this.$message.error('未登录');
            this.$router.push('/')
          }
        })
      },
      handleAvatarSuccess(res, file){
        this.newmanagerinfo.avatar = URL.createObjectURL(file.raw);
      },
      updateInfo(){
        this.$axios.put('/user/userInfo',this.newmanagerinfo).then(res => {
          if (res.code == 200){
            console.log(this.newmanagerinfo.avatar)
            this.userInfo=this.newmanagerinfo
            this.$message.success('修改成功');
            this.centerDialogVisible2=false
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },

    },

    created(){
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        this.ToKen = {token:res.data.data}
      })
      let userInfo=JSON.parse(sessionStorage.getItem('LoginUser'))
      this.userInfo=userInfo
      this.newmanagerinfo=userInfo
    }
  }
</script>

<style scoped lang="scss">
  .title {
    margin-left: 200px;
    line-height: 60px;
    height: 70px;
    border-bottom: 1px solid #e1e1e1;
  }
.avatar{
  width: 100px;
  height: 100px;
}
  .sidebar {
    position: fixed;
    background-color: #545c64;
    width: 200px;
    height: 100vh;
    top: 0;
  }

  .title {
    display: flex;
    justify-content: space-between;
    h2 {
      width: 100%;
    }
    .setting {
      width: 500px;
      margin-right: 100px;
      display: flex;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .el-dropdown {
        width: 100%;
      }
    }
  }

  .main-content {
    margin-left: 220px;
  }
</style>
