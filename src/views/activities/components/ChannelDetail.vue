<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="120px"
                    label="渠道ID:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.ID"> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label-width="120px"
                    label="渠道属性:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.actExpect"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="120px"
                    label="渠道区域:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.actName"> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label-width="120px"
                    label="发展总数:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.actCostCount"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="120px"
                    label="已落实用户"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.actType"> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label-width="120px"
                    label="待落实用户:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.actCostSingle"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="120px"
                    label="待对账用户:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.scope"> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label-width="120px"
                    label="营销活动描述:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.actDesc"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validURL } from '@/utils/validate'
import { fetchActivitiesDetails } from '@/api/activities'

const defaultForm = {
  status: 'draft',
  actName: '',
  actExpect: '',
  actCostCount: '',
  actType: '',
  actCostSingle: '',
  startTime: '',
  endTime: '',
  actDesc: '',
  scope: '',
  id: undefined
}

export default {
  name: 'ArticleDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return +new Date(this.postForm.display_time)
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const code = this.$route.params && this.$route.params.id
      this.fetchData(code)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchActivitiesDetails(id)
        .then(response => {
          this.postForm = response.data

          // just for test
          this.postForm.title += `   Article Id:${this.postForm.id}`
          this.postForm.content_short += `Article Id:${this.postForm.id}`

          // set tagsview title

          // set page title
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
