<template>
  <div>
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      autocomplete="on"
      label-position="left"
    >
      <el-form-item prop="region" required>
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="region"
          v-model="registerForm.region"
          placeholder="所属区域"
          name="region"
          type="text"
        />
      </el-form-item>
      <commonForm ref="commonForm" />
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="validateForm"
      >
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
import commonForm from './components/Form'
import register from './mixins/register'

export default {
  mixins: [register],
  components: { commonForm },
  data() {
    return {
      registerForm: {
        userType: 'admin',
        region: ''
      },
      registerRules: {
        region: [{ required: true, trigger: 'blur' }]
      }
    }
  }
}
</script>
