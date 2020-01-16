<template>
   <div class="register">
    <div class="close" @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input placeholder='用户名/手机号码' type='text' v-model="username" :rules="/^1\d{4,10}$/" err-msg='你输入的用户名格式有误'></hm-input>
    </div>
    <div class="nickname">
       <hm-input placeholder='昵称' type='text' v-model="nickname" :rules="/^[\u4e00-\u9fa5]{3,8}$/" err-msg=
      "你输入的昵称只能是3-8位的中文"></hm-input>
    </div>
    <div class="password">
      <hm-input placeholder='密码' type='password' v-model="password" :rules="/^\d{3,12}$/" err-msg='你输入的密码格式有误'></hm-input>
    </div>
    <div class="btn">
      <HmButton @click='register'>注册</HmButton>
    </div>
      <div class="go-register">
      已有账号？立即<router-link to='/login'>登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      nickname: '',
      password: ''
    }
  },
  methods: {
    async register () {
      if (!this.username && !this.nickname && !this.password) return
      const res = await this.$axios.post('/register', {
        username: this.username,
        nickname: this.nickname,
        password: this.password
      })
      if (res.data.statusCode === 400) {
        this.$toast.fail('注册失败')
      } else {
        this.$toast.success('注册成功')
        // 如果使用path跳转，只能通过query
        // 如果使用name跳转， 可以通过params或者query传参
        this.$router.push({
          // 配置路由的时候要配置name
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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
