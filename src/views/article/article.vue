<template>
  <div class="contain-article">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="reqParams" label-width="80px" size="small">
        <el-form-item label="状态 :">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道 :">
          <el-select v-model="reqParams.channel_id" clearable placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期 :">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单 -->
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格 -->
      <!-- lable是表头文字
      prop字段名称-->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" circle @click="toEdit(scope.row.id)"></el-button>

            <el-button type="danger" plain icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- total 是总条数 -->
      <!-- page-size 默认显示10条每一页 -->
      <!-- current-page 动态激活当前的页码对应的按钮 -->
      <!-- current-change 事件：当页码改变（点击页码按钮，上一页，下一页）就执行  参数当前改变后的页码-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        delivery: false,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1
      },
      channelOptions: [],
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$axios.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    search () {
      // 如果频道的值 '' 时候 修改为 null
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    toEdit (id) {
      // this.$router.push('/publish?id=' + id)
      this.$router.push({ path: 'publish', query: { id } })
    },
    async del (id) {
      await this.$axios.delete(`articles/${id}`)
      this.$message.success('删除文章成功')
      this.getArticles()
    }
  },
  created () {
    this.getChannelOptions()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
</style>
