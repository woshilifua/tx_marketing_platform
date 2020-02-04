<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <sticky
        :z-index="10"
        :class-name="'sub-navbar ' + postForm.status"
        v-if="isEdit"
      >
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >
          发布
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="140px"
                    label="活动ID:"
                    class="postInfo-container-item"
                  >
                    <el-input v-model="postForm.id" disabled> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label-width="140px"
                    label="营销活动目标:"
                    class="postInfo-container-item"
                    prop="actExpect"
                  >
                    <el-input v-model="postForm.actExpect"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="140px"
                    label="活动名称:"
                    class="postInfo-container-item"
                    prop="actName"
                  >
                    <el-input v-model="postForm.actName"> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label-width="140px"
                    label="营销成本总额:"
                    class="postInfo-container-item"
                    prop="actCostCount"
                  >
                    <el-input v-model.number="postForm.actCostCount">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="140px"
                    label="活动分类:"
                    class="postInfo-container-item"
                    prop="actType"
                  >
                    <el-select v-model="postForm.actType" placeholder="请选择">
                      <el-option
                        v-for="item in actTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label-width="140px"
                    label="单用户营销成本:"
                    class="postInfo-container-item"
                    prop="actCostSingle"
                  >
                    <el-input v-model.number="postForm.actCostSingle">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="140px"
                    label="活动范围:"
                    class="postInfo-container-item"
                    prop="scope"
                  >
                    <el-input v-model="postForm.scope"> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    label-width="140px"
                    label="营销活动描述:"
                    class="postInfo-container-item"
                    prop="actDesc"
                  >
                    <el-input v-model="postForm.actDesc"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label-width="140px"
                    label="营销活动周期:"
                    class="postInfo-container-item"
                    prop="timePeriod"
                  >
                    <el-date-picker
                      v-model="postForm.timePeriod"
                      type="datetimerange"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    >
                    </el-date-picker>
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
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchActivity, createActivity } from '@/api/activity'

const defaultForm = {
  status: 'draft',
  actName: '江苏省营销活动', // 活动名称
  actExpect: '200000', // 活动目标
  actCostCount: 120000, // 营销成本总额
  actType: '', //活动分类
  actCostSingle: 12, // 单用户营销成本
  timePeriod: [],
  startTime: '', // 开始日期
  endTime: '', // 结束日期
  actDesc: '2020年上半年计划', // 营销活动描述
  scope: '江苏省',
  id: 'DNF-2020022119123'
}

export default {
  name: 'ArticleDetail',
  components: {
    Sticky
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        actName: [{ required: true }],
        actExpect: [{ required: true }],
        actCostCount: [
          { required: true },
          { type: 'number', message: '营销成本总额必须为数字值' }
        ],
        actCostSingle: [
          { required: true },
          { type: 'number', message: '单用户营销成本必须为数字值' }
        ],
        scope: [{ required: true }],
        actType: [{ required: true }],
        timePeriod: [{ required: true }],
        actDesc: [{ required: true }]
      },
      tempRoute: {},
      actTypes: [
        { value: '积分型', label: '积分型' },
        { value: '权益合作型', label: '权益合作型' },
        { value: '折扣型', label: '折扣型' },
        { value: '满减型', label: '满减型' },
        { value: '买送型', label: '买送型' }
      ]
    }
  },
  computed: {
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
      // const code = this.$route.params && this.$route.params.id
      // this.fetchData(code)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchActivity(id)
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
    setTimePeriod(form) {
      form.startTime = form.timePeriod[0]
      form.endTime = form.timePeriod[1]
      delete form.timePeriod
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          let form = { ...this.postForm }
          this.setTimePeriod(form)
          this.loading = true
          createActivity(form)
            .then(response => {
              console.log(response)
              if (response.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '营销活动发布成功, 请等待审核',
                  type: 'success',
                  duration: 2000
                })
              }
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
