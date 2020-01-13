<template>
  <el-form
    ref="registerForm"
    :model="registerForm"
    :rules="registerRules"
    class="register-form"
    autocomplete="on"
    label-position="left"
  >
    <div class="title-container">
      <h3 class="title">渠道注册</h3>
    </div>
    <el-form-item prop="username">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-select v-model="registerForm.role" placeholder="选择角色">
        <el-option key="admin" label="管理员" value="admin"> </el-option>
        <el-option key="sale" label="销售" value="sale"> </el-option>
        <el-option key="channel" label="渠道" value="channel"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="username">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="username"
        v-model="registerForm.username"
        placeholder="用户名"
        name="username"
        type="text"
        tabindex="1"
        autocomplete="on"
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
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          @keyup.native="checkCapslock"
          @blur="capsTooltip = false"
          @keyup.enter.native="handleregister"
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
        v-model="registerForm.passwordRepeat"
        :type="passwordType"
        placeholder="重复密码"
        name="passwordRepeat"
        tabindex="3"
        @keyup.native="checkCapslock"
        @blur="capsTooltip = false"
        @keyup.enter.native="handleregister"
      />
    </el-form-item>

    <el-button
      :loading="loading"
      type="primary"
      style="width:100%;margin-bottom:30px;"
      @click.native.prevent="handleregister"
    >
      注册
    </el-button>
  </el-form>
</template>

<script>
import registerForm from './mixins/register'

const channelForm = {
  role: 'channel'
}
export default {
  mixins: [registerForm],
  created() {
    Object.assign(this.registerForm, channelForm)
  }
}
</script>
