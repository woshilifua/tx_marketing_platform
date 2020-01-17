<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="commone-form"
    label-position="left"
  >
    <el-form-item prop="userName">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="username"
        v-model="form.userName"
        placeholder="用户名"
        name="username"
        type="text"
      />
    </el-form-item>

    <el-tooltip
      v-model="capsTooltip"
      content="Caps lock is On"
      placement="right"
      manual
    >
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="form.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          @keyup.native="checkCapslock"
          @blur="capsTooltip = false"
          @keyup.enter.native="validateForm"
        />
      </el-form-item>
    </el-tooltip>

    <el-form-item prop="passwordRepeat">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        :key="passwordType"
        ref="passwordRepeat"
        v-model="form.passwordRepeat"
        :type="passwordType"
        placeholder="重复密码"
        name="passwordRepeat"
        @keyup.native="checkCapslock"
        @blur="capsTooltip = false"
        @keyup.enter.native="validateForm"
      />
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入不少于 6 位数的密码'))
      } else {
        callback()
      }
    }
    const validatePasswordRepeat = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入不少于 6 位数的密码'))
      } else if (value !== this.form.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userName: 'marketings',
        password: '111111',
        passwordRepeat: '111111'
      },
      rules: {
        userName: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        passwordRepeat: [
          { required: true, trigger: 'blur', validator: validatePasswordRepeat }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    validateForm(callback) {
      this.$refs.form.validate(valid => {
        if (valid) {
          let form = { ...this.form }
          delete form.passwordRepeat
          callback(true, form)
        } else {
          callback(false)
        }
      })
    }
  }
}
</script>
