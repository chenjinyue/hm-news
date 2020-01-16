<template>
  <div class="input_box">
      <input :type="type" :placeholder='placeholder' :value="value" @input='fn' :class='status'>
      <span v-show='showTip'>{{errMsg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  methods: {
    fn (e) {
      const { value } = e.target
      this.$emit('input', value)
      if (!this.rules) return
      if (this.rules.test(value)) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    }
  },
  computed: {
    showTip () {
      return this.status === 'error' && this.errMsg
    }
  }
}
</script>

<style lang='scss' scoped>
.input_box{
  width: 100%;
  padding-bottom: 15px;
  position: relative;
  input{
    width: 100%;
    background-color: transparent;
    border-bottom: 1px solid #666;
    height: 38px;
    margin-bottom: 5px;
    &.success{
      border-color: green;
    }
    &.error{
      border-color: red;
    }
  }
  span {
    color: red;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
