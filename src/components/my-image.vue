<template>
  <div class="my-image">
    <div class="btn_box" @click="open">
      <img src="../assets/default.png" alt />
    </div>

    <!-- //提示框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <!-- 按钮 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img_list">
            <div
              @click="selectedImage(item.url)"
              :class="{selected: selectedImageUrl===item.url}"
              class="img_item"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" />
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
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="second">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          :on-success="handleSuccess"
          :show-file-list="false"
          name="image"
        >
          <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local.js'

export default {
  data () {
    return {
      // 对话框显示隐藏
      dialogVisible: false,
      activeName: 'first',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      //   选中图片的地址
      selectedImageUrl: null,
      // 上传的图片地址
      uploadImageUrl: null
    }
  },
  methods: {
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
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
    selectedImage (url) {
      this.selectedImageUrl = url
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px #ccc dashed;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}

.img_list {
  padding-top: 30px;
  .img_item {
    width: 120px;
    height: 120px;
    display: inline-block;
    margin-right: 40px;
    margin-bottom: 20px;
    position: relative;
    border: 1px dashed #ddd;
    &.selected::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
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
