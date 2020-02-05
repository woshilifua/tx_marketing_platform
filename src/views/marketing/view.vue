<template>
  <div>
    <Detail :status="'view'" />
    <div class="list">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="渠道 ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="渠道属性">
          <template slot-scope="scope">
            <span>{{ scope.row.channelName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="渠道所属区域">
          <template slot-scope="scope">
            <span>{{ scope.row.provName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="发展总数">
          <template slot-scope="scope">
            <span>{{ scope.row.actCostCount }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="发展占比">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="已落实用户">
          <template slot-scope="scope">
            <span>{{ scope.row.channelCode }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="待落实用户">
          <template slot-scope="scope">
            <span>{{ scope.row.channelCode }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="渠道发展明细" width="120">
          <template slot-scope="scope">
            <router-link
              :to="'/activity/view/channel/' + scope.row.channelCode"
            >
              <el-button type="primary" size="small" icon="el-icon-edit">
                查看
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Detail from './components/Detail'
import { fetchActivityDetails } from '@/api/activity'

export default {
  name: 'ViewActivity',
  components: { Detail },
  data() {
    return {
      listLoading: false,
      list: null
    }
  },
  created() {
    const code = this.$route.params && this.$route.params.code
    this.fetchActivityDetails(code)
  },
  methods: {
    fetchActivityDetails(code) {
      this.listLoading = true
      fetchActivityDetails(code)
        .then(response => {
          this.list = response.data
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0 45px 20px 50px;
}
</style>
