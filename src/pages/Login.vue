<template>
  <div class="login">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input placeholder='用户名/手机号码' type='text' v-model="username" :rules="/^1\d{4,10}$/" err-msg='你输入的用户名格式有误'></hm-input>
    </div>
    <div class="password">
      <hm-input placeholder='密码' type='password' v-model="password" :rules="/^\d{3,12}$/" err-msg='你输入的密码格式有误'></hm-input>
    </div>
    <div class="btn">
      <HmButton @click='login'>登录</HmButton>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HmInput from '../components/HmInput'
import HmButton from '../components/HmButton'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    HmInput,
    HmButton
  },
  methods: {
    async login () {
      if (!this.username || !this.password) return
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      // 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
      if (res.data.statusCode === 401) {
        this.$toast.fail('用户不存在')
      } else {
        this.$toast.success('登录成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
  .close {
    i {
      font-size: 27px;
      color: #000;
    }
  }
  .logo {
    text-align: center;
    i {
      font-size: 126px;
      color: #d81e06;
    }
  }
  .btn {
    margin-top: 30px;
  }
}
</style>
