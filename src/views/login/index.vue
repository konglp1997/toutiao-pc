<template>
  <div class="contain">
    <el-card>
      <img src="../../assets/logo_index.png" width="200px" alt />
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input style="width:235px;margin-right:10px" v-model="form.code" placeholder="请输入验证码"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>

        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local.js'
const checkMobile = function (rule, value, callback) {
  if (/^1[3-9]\d{9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('手机号格式错误'))
  }
}
export default {
  methods: {
    login () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // this.$axios
          //   .post('authorizations', this.form)
          //   .then(res => {
          //     // 保存用户信息
          //     local.setUser(res.data.data)

          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码错误')
          //   })
          try {
            const { data: { data } } = await this.$axios.post('authorizations', this.form)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '246810',
        mobile: '13131313131'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码6个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style  scoped lang="less">
.contain {
  width: 100%;
  height: 100%;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  position: absolute;
  top: 0;
  left: 0;
}
.el-card {
  width: 400px;
  height: 370px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    margin: 0 auto 30px;
  }
}
</style>
