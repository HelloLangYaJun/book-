<template>
  <div class="tab">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="介绍"
        width="280">
      </el-table-column>
      <el-table-column
        label="头像"
        width="280">
        <template slot-scope="scope" >
          <img :src="scope.row.avatar"></img>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="xinjian"><el-button @click="openAdd" type="primary" class="btn" >新建管理员</el-button></div>
    <!--....................................分割线..................................-->
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <div class="content">
        用户名： <el-input v-model="manager.username" placeholder="例：Langyajun" type="text"></el-input>
        密码： <el-input v-model="manager.password" placeholder="请输入密码" type="password"></el-input>
        邮箱： <el-input v-model="manager.email" placeholder="13366475**@qq.com" type="text"></el-input>
        昵称：<el-input v-model="manager.nickname" placeholder="落叶秋风" type="text"></el-input>
        个人介绍：<el-input v-model="manager.desc" placeholder="吃我一招big Bar"  type="textarea" :rows="3"></el-input>
        头像：<img :src="manager.avatar?manager.avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537007833552&di=75b4aa6ade9e3b06dc1fd051a449b86c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ce3e5541100f000001e71b354cd0.jpg'" alt="" class="userImg">
        <input type="file" name="file" accept="image/jpeg,image/png,image/jpg" @change="up" id="file-input">
        <el-input v-model="manager.avatar" placeholder="头像地址" type="text"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Add">确 定</el-button>
     </span>
    </el-dialog>
    <!--...................................................-->
    <el-dialog
      title="确定删除？删除后不可恢复"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="Delete">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
    export default {
        data(){
          return{
            tableData:[],
             manager:{
               avatar:'',
               username:'',
               nickname:'',
               desc:'',
               password:'',
               email:''
             },
          centerDialogVisible:false,
            ToKen:'',
            deleteid:'',
            dialogVisible:false
          }
        },
      methods:{
        getData(){
          console.log('1')
          this.$axios.get('/user').then(res=>{
            if (res.code==200){
              this.tableData=res.data
              console.log(res.data)
            }
            else {
              this.$message.error('登录状态失效');
              this.$router.push('/')
            }
          })
        },
        up($event){
          console.log(this.manager)
          var file = $event.target.files[0];
          var form = new FormData();
          form.append("file", file);
          form.append("token", this.ToKen);
          axios.post("https://upload-z1.qiniup.com", form,).then(res => {
             this.manager.avatar=res.data.url
             console.log(res.data.url,this.manager.avatar)
          })
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          this.deleteid=row._id
         this.dialogVisible=true
        },
        Delete(){
          this.$axios.post('/user/delete',{userIds:[this.deleteid]}).then(res=>{
            console.log('ok')
            if (res.code==200){
              console.log('ok')
              console.log(res.data)
              this.dialogVisible=false
              this.getData()
            }
            else {
              this.$message.error('登录状态失效');
              this.$router.push('/')
            }
          })
        },
        openAdd(){
          this.manager={}
          this.centerDialogVisible = true
        },
        Add(){
          let flag=0;
          for(var item in this.manager){
            if(item){
              flag++
            }
          }
          if(flag==6){
            console.log(this.manager)
            this.$axios.post('/user',this.manager).then(res=>{
              console.log('ok')
              if (res.code==200){
                console.log('ok')
                console.log(res.data)
                this.centerDialogVisible = false
                this.getData()
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
        }
      },
      created(){
          this.getData()
         axios.get('http://upload.yaojunrong.com/getToken').then(res=> {
          this.ToKen = res.data.data
        })
      },
    }

</script>

<style scoped lang="scss">
  .tab{
    text-align: left;
    .xinjian{
      width: 100%;
      margin-top: 10px;
      text-align: center;
    }
  }
 .cell{
   height: 30px;
   img{
     width: 45px;
     height: 45px;
   }
 }
  .userImg{
    width: 50px;
    height: 50px;
  }
</style>
