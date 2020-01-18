<template>
  <div class="item" @click='handleClick'>
    <div class="left">{{name}}</div>
    <div class="center">{{desc}}</div>
    <div class="right">
        <i class='iconfont iconjiantou1'></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang='scss' scoped>
.item {
    height: 40px;
    border-bottom: 1px solid #ccc;
    display: flex;
    line-height: 40px;
    .left {
        font-size: 14px;
        color: #000;
    }
    .center {
        font-size: 12px;
        flex:1;
        text-align: right;
        margin-right: 5px;
        color: #999;
    }
    .right {
        font-size: 17px;
    }
}
</style>
