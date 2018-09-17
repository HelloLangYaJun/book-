<template>
  <div class="container">
    <h2 class="title">欢迎来到后台管理系统</h2>
    <div class="login-box">
      <h2 class="login-box-title">请登录</h2>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-button @click="Login" type="primary" class="btn" :loading="isloading">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "login",
    data() {
      return {
        formData: {
          username: '',
          password: ''
        },
        UserInfo: [],
        isloading: false
      }
    },
    methods: {
      Login() {
        this.isloading = true
        console.log(this.formData)
        this.$axios.get('/user').then(res => {
          if (res.code == 200) {
            this.UserInfo = res.data
            console.log(this.UserInfo)
          }
          this.$axios.post('/login', this.formData).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '登陆成功',
                type: 'success'
              });

              sessionStorage.setItem('LoginUser',JSON.stringify(res.data))
              this.$router.push('/layout/users')
            }
            else {
              this.$message.error('登陆失败');
            }
            this.isloading = false
          })
        })

      },
    },
    created(){

    }

  }
</script>
<style scoped lang="scss">
  .container {
    height: 100vh;
    border-top: 1px solid #545c64;
    background-color: #545c64;
    .title {
      margin-top: 150px;
      color: #fff;
      font-weight: 400;
    }
    .login-box {
      padding: 0 20px;
      width: 400px;
      height: 320px;
      background-color: #fff;
      margin: 0 auto;
      border: 1px solid #f1f1f1;
      border-radius: 6px;
      box-shadow: 0 0 5px #555;
      margin-top: 20px;
      .login-box-title {
        margin-top: 20px;
      }
      .btn {
        width: 100%;
      }
    }
  }

</style>
