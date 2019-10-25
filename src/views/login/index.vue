<template>
  <div class="contain">
    <el-card>
      <img src="../../assets/logo_index.png" width="200px"  alt />
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input style="width:235px;margin-right:10px" v-model="form.code" placeholder="请输入验证码"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>

        <el-form-item>
            <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        code: ''
      }
    }
  }
}
</script>

<style>
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
}
img{
      display: block;
      margin:0 auto 30px;
  }
</style>
