export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    validateForm() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$refs.commonForm.validateForm((valid, form) => {
            if (valid) {
              let reqForm = { ...this.registerForm, ...form }
              console.log(reqForm)
              this.$message({
                message: '注册成功',
                type: 'success',
                showClose: true,
                duration: 1000
              })
            }
          })
        }
      })

    }
  }
}