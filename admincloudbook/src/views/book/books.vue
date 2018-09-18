<template>
  <div class="container">
    <div class="select">
      <el-button type="primary" @click="openaddBook">添加书到该分类<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-select v-model="selectType" clearable placeholder="请选择" @change='select'>
        <el-option
          v-for="item in bookClassify"
          :key="item.value"
          :label="item.title"
          :value="item._id">
        </el-option>
      </el-select>
    </div>
    <div class="bookcontent" v-for="item in bookData">
      <div class="top">
        <div class="left"><img :src="item.img " alt=""></div>
        <div class="right">
          <h3 class="title">{{item.title}}</h3>
          <h3 class="author">作者：{{item.author}}</h3>
          <h3 class="author">喜欢：{{item.looknums}}</h3>
        </div>
      </div>
      <div class="middle">
        <span>{{item.desc}}</span>
      </div>
      <div class="bottom">
        <el-button type="danger" icon="el-icon-delete" circle @click="opendelClasscifyBook(item)"></el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <span>确定删除{{item.title}}这本?删除后不可恢复！</span>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delBookInclass">确 定</el-button>
  </span>
        </el-dialog>
        <el-button type="primary" @click="openupdate(item)">修改</el-button>
      </div>
    </div>
    <!--.........................添加一本书到该分类...................-->
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible2"
      width="40%"
      center>
      <div class="content">
        书名：
        <el-select v-model="selectbookid" clearable placeholder="请选择">
          <el-option
            v-for="item in allbook"
            :key="item.value"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addbook">确 定</el-button>
     </span>
    </el-dialog>
    <!--.........................添加一本书到该分类...................-->
    <!--......................分割线.......................-->
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <div class="content">
        书名：
        <el-input v-model="focusbook.title" placeholder="请输入地址" type="text"></el-input>
        图片地址：
        <el-input v-model="focusbook.img" placeholder="请输入地址" type="text"></el-input>
        作者：
        <el-input v-model="focusbook.author" placeholder="输入作者姓名" type="text"></el-input>
        类型：
        <el-select v-model="focusbook.typetitle" clearable placeholder="请选择">
          <el-option
            v-for="item in bookClassify"
            :key="item.value"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
        <br>
        描述：
        <el-input v-model="focusbook.desc" placeholder="书籍描述" type="textarea" :rows="3"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "books",
    data() {
      return {
        allbook: [],
        bookData: [],
        focusbook: {},
        dialogVisible: false,
        centerDialogVisible: false,
        centerDialogVisible2: false,
        bookClassify: [],
        selectType: '',
        selectbookid: '',
        delClasscifyBookId: ''
      }
    },
    methods: {
      // 获取分类
      getClassify() {
        this.$axios.get(`/category?pn=1&size=100`).then(res => {
          if (res.code == 200) {
            console.log(res.data)
            this.bookClassify = res.data
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },
      //添加新书到某个分类
      openaddBook() {
        if (!this.selectType) {
          this.$message.error('请先选择分类');
        }
        else {
          this.centerDialogVisible2 = true
        }
      },
      addbook() {
        if (this.selectType && this.selectbookid) {
          this.$axios.post(`/category/${this.selectType}/book/${this.selectbookid}`).then(res => {
            if (res.code == 200) {
              this.selectbookid = ''
              this.$message.success('添加成功');
              this.centerDialogVisible2 = false
              this.getbookData()
            }
            else {
              this.$message.error('登录状态失效');
              this.$router.push('/')
            }
          })
        }
        else {
          this.$message.error('请先选择分类且选择一本书');
        }

      },
      //删除书籍于某个分类
      opendelClasscifyBook(item) {
        if (!this.selectType) {
          this.$message.error('请先选择分类');
        }
        else {
          this.delClasscifyBook = ''
          this.delClasscifyBookId = item._id
          this.dialogVisible = true
        }

      },
      delBookInclass() {
        this.$axios.delete(`/category/${this.selectType}/book/${this.delClasscifyBookId}`).then(res => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.delClasscifyBookId = ''
            this.dialogVisible = false
            this.getbookData()
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },
      //获取所有书数据
      getallbook() {
        this.$axios.get(`/book?pn=1&size=100`).then(res => {
          if (res.code == 200) {
            console.log(res.data)
            this.allbook = res.data
            console.log(this.allbook)
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },

      // 获取一个分类下的数据书籍
      getbookData() {
        let url = '/book?pn=1&size=100'
        if (this.selectType) {
          url = `/category/${this.selectType}/books?pn=1&size=100`
        }
        this.$axios.get(`${url}`).then(res => {
          if (res.code == 200) {
            console.log(res.data)
            if (this.selectType) {
              this.bookData = res.data.books
              if (!res.data.books.length) {
                this.$message.error('该分类暂无数据');
              }
            } else {
              this.bookData = res.data
            }
            console.log(this.bookData)
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
        })
      },
      openupdate(item) {
        this.focusbook = {
          title: item.title,
          book_id: item._id,
          index: item.index,
          desc: item.desc,
          author: item.author,
          img: item.img,
          type: item.type._id,
          typetitle: `(默认)${item.type.title}`
        }
        this.centerDialogVisible = true
      },
      update() {
        if (this.focusbook.typetitle.substring(0, 4) == '(默认)') {
        }
        else {
          this.focusbook.type = this.focusbook.typetitle
        }
        console.log(this.focusbook)
        this.$axios.put('/book', this.focusbook).then(res => {
          if (res.code == 200) {
            console.log(res.data)
            this.$message.success('修改成功');
            this.getbookData()
          }
          else {
            this.$message.error('登录状态失效');
            this.$router.push('/')
          }
          this.centerDialogVisible = false
        })
      },
      // 选择分类功能
      select() {
        this.getbookData()
        this.getClassify()
      }
    },
    created() {
      this.getallbook()
      if (this.$route.query.selected) {
        this.selectType = this.$route.query.selected
      }
      this.getbookData()
      this.getClassify()
    }
  }
</script>

<style scoped lang="scss">
  .select {
    margin-top: 20px;
    margin-left: -200px;
  }

  .bookcontent {
    margin: 15px;
    width: 300px;
    height: 350px;
    float: left;
    position: relative;
    box-shadow: 0 0 5px #555;
    .top {
      display: flex;
      .left {
        width: 100px;
        height: 150px;
        img {
          width: 98%;
          height: 98%;
          box-shadow: 0 0 5px #555;
        }
      }
      .right {
        width: 200px;
        height: 150px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: white;
        .title {
          font-size: 16px;
        }
        .author {
          font-size: 14px;
        }
      }
    }
    .middle {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    }
    .bottom {
      position: absolute;
      bottom: 10px;
      width: 100%;
    }
  }
</style>
