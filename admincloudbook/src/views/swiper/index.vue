<template>
  <div>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in swiper" >
        <h3>
          <img :src="item.img" alt="">
          <div class="buttom">
            <h1>{{item.book.title}}</h1>
          </div>
        </h3>
      </el-carousel-item>
    </el-carousel>
    <div class="swipercontent">
      <el-table
        :data="swiper"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="轮播图标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="index"
          label="排序"
          width="180">
        </el-table-column>
        <el-table-column
          prop="_id"
          label="书籍id">
        </el-table-column>
        <el-table-column
          prop="img"
          label="轮播图">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="openhandleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除{{ ofcuseSwiper.title}}这个轮播图?删除后不可恢复！</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delSwiper">确 定</el-button>
  </span>
    </el-dialog>
    <div class="xinjian">
      <el-button @click="openSwiper" type="primary" class="btn">新建轮播图</el-button>
    </div>
    <!--....................................删除分类........................................-->
    <!--................................新建轮播图.....................................-->
    <el-dialog
      title="新建"
      :visible.sync="centerDialogVisibleadd"
      width="40%"
      center>
      <div class="content">
        轮播图标题：
        <el-input v-model="upLoad.title" placeholder="学习前端" type="text"></el-input>
        书籍id：
       <el-select v-model="upLoad.book" clearable placeholder="请选择">
        <el-option
          v-for="item in bookid"
          :label="item.title"
          :value="item._id">
        </el-option>
      </el-select>
        <br>
        <el-input v-model="upLoad.img" placeholder="落叶秋风" type="text"></el-input>
        轮播图片：<el-upload
        class="my-uploader"
        action="https://upload-z1.qiniup.com"
        :show-file-list="false"
        :data="ToKen"
        :on-success="handleAvatarSuccess2">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleadd = false">取 消</el-button>
        <el-button type="primary" @click="addSwiper">确 定</el-button>
     </span>
    </el-dialog>
    <!--................................新建轮播图.....................................-->
    <!--................................修改轮播图.....................................-->
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <div class="content">
        轮播图标题：
        <el-input v-model="ofcuseSwiper.title" placeholder="学习前端" type="text"></el-input>
        书籍id：
        <el-input v-model="ofcuseSwiper._id" placeholder="5b9cfb49e8026a0948aa8368" type="text"></el-input>
        排序：
        <el-input v-model="ofcuseSwiper.index" placeholder="12" type="text"></el-input>
        原图片：
        <br>
        <img :src="ofcuseSwiper.img" alt="" class="oldimg">
        <el-input v-model="ofcuseSwiper.img" placeholder="落叶秋风" type="text"></el-input>
        新图片：<el-upload
        class="my-uploader"
        action="https://upload-z1.qiniup.com"
        :show-file-list="false"
        :data="ToKen"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
     </span>
    </el-dialog>
    <!--................................修改轮播图.....................................-->
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "index",
    data() {
      return {
        swiper: [],
        imageUrl:'',
        bookid:[],
        upLoad:{},
        newimg:'',
        ofcuseSwiper: {},
        ToKen:{},
        centerDialogVisible: false,
        centerDialogVisibleadd:false,
        dialogVisible:false,

      }
    },
    methods: {
      getSwiper() {
        this.$axios.get('/swiper').then(res => {
          if (res.code == 200) {
            console.log(res.data)
            this.swiper = res.data
          }
          else {

          }
        })
      },
      //删除轮播图
      openhandleDelete(index,row){
        this.ofcuseSwiper=row
        this.dialogVisible=true
      },
      delSwiper(){
        console.log(this.ofcuseSwiper)
        this.$axios.post('/swiper/delete',{ids:[this.ofcuseSwiper._id]}).then(res => {
          if (res.code == 200) {
            this.getSwiper()
            this.dialogVisible=false
            this.$message.success('删除成功');
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },
      // 打开新建轮播图
      openSwiper(){
        this.upLoad={}
        this.imageUrl=''
        this.$axios.get('/book').then(res => {
          if (res.code == 200) {
            console.log(res.data)
            this.bookid = res.data
            console.log(this.bookid)
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
        this.centerDialogVisibleadd=true

      },
      addSwiper(){
        console.log(this.upLoad)
        let flag=0;
        for(var item in this.upLoad){
          if(item){
            flag++
          }
          console.log(flag)
        }
        if(flag==3){
          console.log(this.upLoad)
          this.$axios.post(`/swiper`,this.upLoad).then(res=>{
            if (res.code==200){
              this.$message.success('添加成功');
              this.centerDialogVisibleadd = false
              this.getSwiper()
            }
            else {
              this.$message.error('登录状态失效');
              this.$router.push('/')
            }
          })
        }
        else {
          this.$message.error('请填写完整信息');
        }
      },
      // 打开新建轮播图
      // 打开编辑
      handleEdit(index,row){
        this.ofcuseSwiper=row
        console.log(row)
        this.imageUrl=''
        this.centerDialogVisible=true
      },

      upload(){
        let flag=0;
        for(var item in this.ofcuseSwiper){
          if(item){
            flag++
          }
          console.log(flag)
        }
        if(flag==7){
          if(this.imageUrl){
            this.ofcuseSwiper.img=this.newimg
          }
          console.log(this.ofcuseSwiper)
          this.ofcuseSwiper.book=this.ofcuseSwiper.book._id
          this.$axios.put(`/swiper/${this.ofcuseSwiper._id}`,this.ofcuseSwiper).then(res=>{
            if (res.code==200){
              this.$message.success('修改成功');
              this.centerDialogVisible = false
              this.getSwiper()
            }
            else {
              this.$message.error('登录状态失效');
              this.$router.push('/')
            }
          })
        }
        else {
          this.$message.error('请填写完整信息');
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.newimg=res.url
      },
      handleAvatarSuccess2(res, file){
        this.imageUrl = URL.createObjectURL(file.raw);
        this.upLoad.img=res.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    },
    created() {
      this.getSwiper()
      axios.get('http://upload.yaojunrong.com/getToken').then(res=> {
        this.ToKen = {token:res.data.data}
      })
    }
  }
</script>

<style scoped lang="scss">
  .swipercontent {
    text-align: left;
  }
.content{
  .oldimg{
    width: 60px;
    height: 60px;
  }
}
  .xinjian {
    margin-top: 10px;
    button {
      width: 150px;
      height: 40px;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    position: relative;
    img {
      width: 100%;
      height: 400px
    }
    .buttom {
      position: absolute;
      bottom: 96px;
      width: 100%;
      height: 60px;
      background-color: black;
      opacity: 0.8;
      h1 {
        color: white;
        height: 60px;
        z-index: 998;
        line-height: 60px;
      }
    }
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  /*.....................上传样式....................................*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dotted #000;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
