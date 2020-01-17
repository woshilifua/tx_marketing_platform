<template>
  <div class="register-container">
    <div class="form-option">
      <div class="title-container">
        <h3 class="title">营销系统注册</h3>
      </div>
      <div class="form-item">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-select v-model="currentRole" placeholder="选择角色">
          <el-option key="admin" label="管理员" value="admin"> </el-option>
          <el-option key="marketing" label="营销" value="marketing">
          </el-option>
          <el-option key="channel" label="渠道" value="channel"> </el-option>
        </el-select>
      </div>
    </div>
    <component :is="currentRole" />
  </div>
</template>

<script>
/*
  每个角色对应一个 Component, 
  每个 Component 里面有一个 common form
  用来验证一些共有的属性，如: username, password
  每个 Component 里面只需要添加对应的特有的属性，和验证规则，最后在 mixins 里面进行统一的验证和提交
*/

import admin from './components/Admin'
import marketing from './components/Marketing'
import channel from './components/Channel'

export default {
  components: {
    admin,
    marketing,
    channel
  },
  data() {
    return {
      currentRole: 'admin'
    }
  },
  methods: {
    changeRole(role) {
      this.currentRole = role
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: calc(100% - 34px);

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-select {
    display: inline-block;
    height: 47px;
    width: calc(100% - 35px);
    .el-input {
      width: 100%;
    }
  }
  .el-form-item,
  .form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .form-item {
    margin-bottom: 22px;
  }
}
</style>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form,
  .form-option {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 0 35px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-top: 160px;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
