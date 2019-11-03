<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 按钮 -->
    <div class="btn_box">
      <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 绿色按钮 -->
      <el-button @click="open" style="float:right" type="success" size="small" >添加素材</el-button>
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          :on-success="handleSuccess"
          :show-file-list="false"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
      <!-- 素材列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="footer" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              style="cursor:pointer"
            ></span>
            <span style="cursor:pointer" @click="deleteImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          @current-change="pager"
        ></el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import local from '@/utils/local.js'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      total: 0,
      // 素材列表
      images: [],
      dialogVisible: false,
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$axios.get('/user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$axios.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.is_collected
      this.getImages()
    },
    deleteImage (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$axios.delete(`/user/images/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImages()
        })
        .catch(() => {})
    },
    // 上传图片成功的钩子函数
    handleSuccess (res) {
      this.$message.success('上传素材成功')
      // 获取后台地址给imageUrl
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  padding-top: 30px;
  .img_item {
    width: 180px;
    height: 180px;
    display: inline-block;
    margin-right: 60px;
    margin-bottom: 30px;
    position: relative;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      vertical-align: top;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      text-align: center;
      color: aliceblue;
      span {
        margin: 0 20px;
        //连接上一个选择器
        &.red {
          color: red;
        }
      }
    }
  }
}

</style>
