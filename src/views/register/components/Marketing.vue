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
      <commonForm ref="commonForm" />
      <el-row :gutter="8">
        <el-col :span="8">
          <el-form-item prop="provName">
            <el-input
              ref="provName"
              v-model="registerForm.provName"
              placeholder="省"
              name="provName"
              type="text"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cityName">
            <el-input
              ref="cityName"
              v-model="registerForm.cityName"
              placeholder="市"
              name="cityName"
              type="text"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="countryName">
            <el-input
              ref="countryName"
              v-model="registerForm.countryName"
              placeholder="区"
              name="countryName"
              type="text"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item prop="legalPerson">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="legalPerson"
              v-model="registerForm.legalPerson"
              placeholder="法人"
              name="legalPerson"
              type="text"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="registCapital">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="registCapital"
              v-model="registerForm.registCapital"
              placeholder="注册资金"
              name="registCapital"
              type="text"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item prop="contactPerson">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="contactPerson"
              v-model="registerForm.contactPerson"
              placeholder="联系人"
              name="contactPerson"
              type="text"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="contactPhone">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="contactPhone"
              v-model="registerForm.contactPhone"
              placeholder="联系电话"
              name="contactPhone"
              type="text"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="region">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="licensePath"
          v-model="registerForm.licensePath"
          placeholder="执照地址"
          name="licensePath"
          type="text"
        />
      </el-form-item>
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
        userType: 'marketing',
        provName: '',
        cityName: '',
        countryName: '',
        legalPerson: '',
        registCapital: '',
        contactPerson: '',
        contactPhone: '',
        licensePath: ''
      },
      registerRules: {}
    }
  }
}
</script>
