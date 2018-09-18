<template>
  <div class="tab">
    <el-button type="primary" @click="openAddClasscify">添加新分类<i class="el-icon-upload el-icon--right"></i></el-button>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;内容显示-->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="分类名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="index"
        label="权重"
        width="180">
      </el-table-column>
      <el-table-column
        label="查看图书"
        width="280">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="头像"
        width="280">
        <template slot-scope="scope">
          <img :src="scope.row.icon"></img>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openupdate(scope.row.title,scope.row.icon,scope.row.index,scope.row._id)">编辑
          </el-button>
          <el-button
            size="mini"
            @click="opendel(scope.row._id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;内容显示-->
    <!--.................................删除分类......................................-->
    <el-dialog
      title="删除"
      :visible.sync="centerDialogVisible3"
      width="40%"
      center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="delclasscify">确 定</el-button>
     </span>
    </el-dialog>
    <!--.................................删除分类......................................-->
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;修改弹出层-->
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <div class="content">
        分类名：
        <el-input v-model="formData.title" placeholder="请输入密码" type="text"></el-input>
        头像网络链接：
        <el-input v-model="formData.icon" placeholder="请输入地址" type="text"></el-input>
        排序权重：
        <el-input v-model="formData.index" placeholder="请输入密码" type="text"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
     </span>
    </el-dialog>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;修改弹出层-->
    <!--..............................添加分类...................................-->
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible2"
      width="40%"
      center>
      <div class="content">
        分类名：
        <el-input v-model="newClasscify.title" placeholder="例：Langyajun" type="text"></el-input>
        icon地址：
        <!--<el-upload-->
        <!--class="my-uploader"-->
        <!--action="https://upload-z1.qiniup.com"-->
        <!--:show-file-list="false"-->
        <!--:data="ToKen"-->
        <!--:on-success="handleAvatarSuccess2">-->
        <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
        <el-input v-model="newClasscify.icon" placeholder="例：https://aadasdasdsadzxc.jpg" type="text"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="AddClasscify">确 定</el-button>
     </span>
    </el-dialog>
    <!--..............................添加分类...................................-->
  </div>
</template>

<script>
  export default {
    name: "classify",
    data() {
      return {
        formData: {},
        tableData: [],
        centerDialogVisible: false,
        centerDialogVisible2: false,
        centerDialogVisible3:false,
        newClasscify: {},
        visible2:false,
        delid:''
      }
    },
    methods: {
      getData(){
        this.$axios.get('/category?pn1&size=100').then(res =>{
          if (res.code == 200) {
            this.tableData = res.data
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },
      openupdate(title, icon, index, id) {
        this.formData = {title, icon, index, id}
        this.centerDialogVisible = true
      },
      opendel(id){
        this.delid=''
        this.delid=id
        this.centerDialogVisible3=true;
      },
      delclasscify(){
        this.$axios.delete(`/category/${this.delid}`).then(res => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.centerDialogVisible3=false;
            this.delid=''
            this.getData()
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },
      update() {
        this.$axios.put(`/category/${this.formData.id}`, this.formData).then(res => {
          if (res.code == 200) {
            this.$message.success('修改成功');
            this.centerDialogVisible = false
            this.getData()
          }
          else {
            this.$message.error('登陆状态失效');
            this.$router.push('/')
          }
        })
      },
      // 查看分类下的所有图书
      handleEdit(index,row){
        console.log(row)
        this.$router.push({path:'/layout/books',query:{selected:row._id}})
      },
      //添加新分类
      openAddClasscify() {
        this.centerDialogVisible2=true
      },
      AddClasscify(){
        let flag=0;
        for(var item in this.newClasscify){
          if(item){
            flag++
          }
          console.log(flag)
        }
        if(flag==2){
          this.$axios.post(`/category`,this.newClasscify).then(res => {
            if (res.code == 200) {
              this.$message.success('添加成功');
              this.centerDialogVisible2 = false
              this.getData()
            }
            else {
              this.$message.error('登陆状态失效');
              this.$router.push('/')
            }
          })
        }
        else{
          this.$message.error('请将信息填写完整');
        }
      },
    },
    created() {
      this.getData()
    },
  }
</script>

<style scoped lang="scss">
  .tab {
    text-align: left;
  }

  .cell {
    height: 30px;
    img {
      width: 45px;
      height: 45px;
    }
  }
</style>
