<template>
  <div class="profile">
    <div class="user-info">
      <div class="avatar">
        <!-- 如果在字符串中提供图片的地址，发现图片没有被解析 -->
        <img :src="showImg" alt="">
      </div>
      <div class="info">
        <p>
          <i  v-if='profile.gender===1' class='iconfont iconxingbienan'></i>
          <i  v-else class='iconfont iconxingbienv'></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p>{{profile.create_date | time}}</p>
      </div>
      <div class="icon">
        <i class='iconfont iconjiantou1'></i>
      </div>
    </div>
    <div class="list">
      <hm-nav name='我的关注' desc='关注的用户'></hm-nav>
      <hm-nav name='我的跟帖' desc='跟帖/回复'></hm-nav>
      <hm-nav name='我的收藏' desc='文章/视频'></hm-nav>
      <hm-nav name='设置'></hm-nav>
      <hm-nav name='退出' @click = 'logout'></hm-nav>
    </div>
  </div>
</template>

<script>
import img from '../assets/avatar.jpg'
export default {
  data () {
    return {
      profile: {},
      // 解决图片闪烁问题
      loading: false
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('id')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    this.profile = res.data.data
    this.loading = true
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          titie: '温馨提示',
          message: '你确定退出本账号吗？'
        })
        // 点击确定
        localStorage.removeItem('token')
        localStorage.removeItem('id')

        this.$router.push('/login')
        // 提示
        this.$toast.success('退出成功')
      } catch {
        this.$toast('操作取消')
      }
    }
  },
  computed: {
    showImg () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .profile {
    .user-info {
      padding: 20px;
      display: flex;
      border-bottom: 3px solid #ddd;
      .avatar {
        width: 70px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .info {
         flex: 1;
         padding-left: 10px;
         font-size: 16px;
         color: #000;
         p:first-child {
           margin: 15px 0 5px;
           i {
             margin-right: 5px;
             &.iconxingbienan {
               color: rgb(171, 213, 242);
             }
             &.iconxingbienv {
               color: pink;
             }
           }
         }
         p:last-child {
           color: #999;
           font-size: 14px;
         }
      }
      .icon {
        font-size: 17px;
        line-height: 70px;
      }
    }
    .list {
      padding: 0 20px;
    }
  }
</style>
