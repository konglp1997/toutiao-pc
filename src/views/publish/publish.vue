<template>
  <el-card>
    <div slot="header">
      <my-bread>{{$route.query.id?"编辑":"发布"}}文章</my-bread>
    </div>
    <!-- 表单 -->
    <el-form label-width="120px">
      <el-form-item label="标题：">
        <el-input style="width:400px" v-model="article.title"></el-input>
      </el-form-item>

      <el-form-item label="内容：">
        <quill-editor v-model="article.content" :options="editorOption"></quill-editor>
      </el-form-item>

      <el-form-item label="封面：">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- 封面图组件 -->
            <div>
              <my-image v-model="article.cover.images[0]"></my-image>

            </div>
      </el-form-item>

      <el-form-item label="频道：">
        <my-channel v-model="article.channel_id"></my-channel>
      </el-form-item>
      <el-form-item v-if="$route.query.id">
        <el-button type="primary" @click="update(false)">修改</el-button>
        <el-button @click="update(true)">存入草稿</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="create(false)">发表</el-button>
        <el-button @click="create(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },

  data () {
    return {
      article: {
        content: null,
        title: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [

            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]
          ]
        }
      }
    }
  },
  methods: {
    // 获取文章信息
    async getArticle (id) {
      const { data: { data } } = await this.$axios.get('articles/' + id)
      this.article = data
    },
    async create (draft) {
      await this.$axios.post(`articles?draft=${draft}`, this.article)
      this.$message.success(draft ? '存入草稿成功' : '上传成功')
      this.$router.push('/article')
    },
    // 修改
    async update (draft) {
      await this.$axios.put(`articles/${this.$route.query.id}?draft=${draft}`, this.article)

      this.$message.success(draft ? '存入草稿成功' : '上传成功')
      this.$router.push('/article')
    }
  },
  // 数据改变就会执行
  watch: {
    '$route.query.id': function () {
      const articleId = this.$route.query.id
      if (articleId) {
      // 获取当前文章的信息
        this.getArticle(articleId)
      } else {
        this.article = {
          content: null,
          title: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  // 组件初始化时才会执行一次
  // 当路由规则没有发生变化时，组件是不会初始化的
  // 监听地址栏参数的变化
  created () {
    // 判断当前是否是编辑,根据地址栏是否存在id
    const articleId = this.$route.query.id
    if (articleId) {
      // 获取当前文章的信息
      this.getArticle(articleId)
    } else {
      this.article = {
        content: null,
        title: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  }
}
</script>
