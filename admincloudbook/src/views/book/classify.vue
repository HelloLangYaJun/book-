<template>
  <div class="tab">
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
        </template>
      </el-table-column>
    </el-table>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;内容显示-->
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;修改弹出层-->
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <div class="content">
        分类名： <el-input v-model="formData.title" placeholder="请输入密码" type="text"></el-input>
        头像网络链接：<el-input v-model="formData.icon" placeholder="请输入地址" type="text"></el-input>
        排序权重：<el-input v-model="formData.index" placeholder="请输入密码" type="text"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
     </span>
    </el-dialog>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;修改弹出层-->
    <!--..............................添加分类...................................-->
    
    <!--..............................添加分类...................................-->
  </div>
</template>

<script>
  export default {
    name: "classify",
    data() {
      return {
        formData: {
        },
        tableData: [],
      centerDialogVisible: false
      }
    },
    methods: {
      getData(){
        this.$axios.get('/category?pn=1&size=10').then(res => {
          if (res.code == 200) {
            this.tableData = res.data
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },
      openupdate(title,icon,index,id) {
        this.formData = {title,icon,index,id}
        this.centerDialogVisible=true
      },
      update(){
        this.$axios.put(`/category/${this.formData.id}`,this.formData).then(res => {
          if (res.code == 200) {
            this.$message.success('修改成功');
            this.centerDialogVisible=false
            this.getData()
          }
          else {
            this.$message.error('登陆状态失效');
            this.$router.push('/')
          }
        })
      }
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
