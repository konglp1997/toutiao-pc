<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form label-width="120px">
          <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
          <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
          <el-form-item label="媒体名称：">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍：">
            <el-input v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save" >保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12">
        <!-- 上传 -->
        <el-upload
          class="avatar-uploader"
          action=""
          :headers="headers"
          :show-file-list="false"
          :http-request="uploadPhoto"
        >
          <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="text-align:center">修改头像</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import local from '@/utils/local.js'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    async getUserInfo () {
      const { data: { data } } = await this.$axios.get('user/profile')
      this.userInfo = data
    },
    async save () {
      const { name, intro, email } = this.userInfo
      await this.$axios.patch('user/profile', { params: { name, intro, email } })
      this.$message.success('保存设置成功')

      // 把个人设置里的name传到home组件
      eventBus.$emit('updateName', name)
      // 修改本地存储拿，改，存
      const user = local.getUser()
      user.name = name
      local.setUser(user)
    },
    async saves () {
      await this.$axios
    },
    // 修改用户头像
    // result中的file是文件对象   //文档没有记录，试一试
    async uploadPhoto ({ file }) {
      const formData = new FormData()
      formData.append('photo', file)
      const { data: { data } } = await this.$axios.patch('user/photo', formData)
      this.$message.success('修改用户头像成功')
      this.userInfo.photo = data.photo
      // home
      eventBus.$emit('updatePhoto', data.photo)
      // 修改本地
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang='less'>
</style>
