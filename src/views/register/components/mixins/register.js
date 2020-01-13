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
      } else if (value !== this.registerForm.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        role: '',
        username: '',
        password: '',
        passwordRepeat: ''
      },
      registerRules: {
        username: [
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
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    handleregister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$message({
            message: '注册成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  watch: {
    'registerForm.role': {
      handler(role) {
        this.$emit('change-role', role)
      }
    }
  }
}