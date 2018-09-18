<template>
  <div>
    <canvas id="canvas" style="background:#111"></canvas>
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
              this.$router.push('/layout/index')
            }
            else {
              this.$message.error('登陆失败');
            }
            this.isloading = false
          })
        })

      },
      canvas(){
        //获取画布对象
        var canvas = document.getElementById("canvas");
        //获取画布的上下文
        var context =canvas.getContext("2d");
        //获取浏览器屏幕的宽度和高度
        var W =   document.body.clientWidth;
        var H = document.body.clientHeight;
        //设置canvas的宽度和高度
        canvas.width = W;
        canvas.height = H;
        //每个文字的字体大小
        var fontSize = 16;
        //计算列
        var colunms = Math.floor(W /fontSize);
        //记录每列文字的y轴坐标
        var drops = [];
        //给每一个文字初始化一个起始点的位置
        for(var i=0;i<colunms;i++){
          drops.push(0);
        }
        //运动的文字
        var str ="javascript html5 canvas";
        //4:fillText(str,x,y);原理就是去更改y的坐标位置
        //绘画的函数
        function draw(){
          context.fillStyle = "rgba(0,0,0,0.05)";
          context.fillRect(0,0,W,H);
          //给字体设置样式
          context.font = "700 "+fontSize+"px  微软雅黑";
          //给字体添加颜色
          context.fillStyle ="#00cc33";//可以rgb,hsl, 标准色，十六进制颜色
          //写入画布中
          for(var i=0;i<colunms;i++){
            var index = Math.floor(Math.random() * str.length);
            var x = i*fontSize;
            var y = drops[i] *fontSize;
            context.fillText(str[index],x,y);
            //如果要改变时间，肯定就是改变每次他的起点
            if(y >= canvas.height && Math.random() > 0.99){
              drops[i] = 0;
            }
            drops[i]++;
          }
        };
        function randColor(){
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var b = Math.floor(Math.random() * 256);
          return "rgb("+r+","+g+","+b+")";
        }
        draw();
        setInterval(draw,30);
      }
    },
    created(){
    },
    mounted(){
      this.canvas()
    }
  }
</script>
<style scoped lang="scss">
  #canvas{
  position: absolute;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  .container {
    height: 100vh;
    border-top: 1px solid #545c64;
    background-color: #eee;
    .title {
      position: relative;
      z-index: 9999;
      margin-top: 150px;
      color: #fff;
      font-weight: 400;
    }
    .login-box {
      padding: 0 20px;
      position: relative;
      z-index: 9999;
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
