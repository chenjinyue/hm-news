<template>
  <div class="login">
    <div class="close" @click="$router.go(-1)">
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
    <div class="go-register">
      没有账号？立即<router-link to='/register'>注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      if (!this.username || !this.password) return
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
      if (res.data.statusCode === 401) {
        this.$toast.fail('用户不存在')
      } else {
        this.$toast.success('登录成功')
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('id', user.id)
        this.$router.push({ name: 'profile' })
      }
    }
  },
  created () {
    // console.log(this.$route)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
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
  .go-register {
    margin-top: 20px;
    text-align: center;
    font-size: 22px;
    // color: #000;
    // font-weight: 700;
  }
}
</style>
