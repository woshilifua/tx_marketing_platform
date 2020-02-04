<template>
  <div>
    <ChannelDetail :is-edit="false" />
    <div class="list">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="用户手机号">
          <template slot-scope="scope">
            <span>{{ scope.row.channelName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="身份证号">
          <template slot-scope="scope">
            <span>{{ scope.row.provName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.actCostCount }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="参与套餐">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="套餐周期">
          <template slot-scope="scope">
            <span>{{ scope.row.channelCode }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="参与时间">
          <template slot-scope="scope">
            <span>{{ scope.row.channelCode }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.channelCode }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ChannelDetail from './components/ChannelDetail'
import { fetchActivityChannels } from '@/api/activity'

export default {
  name: 'ViewActivity',
  components: { ChannelDetail },
  data() {
    return {
      listLoading: false,
      list: null
    }
  },
  created() {
    const code = this.$route.params && this.$route.params.code
    this.fetchData(code)
  },
  methods: {
    fetchData(code) {
      this.listLoading = true
      fetchActivityChannels(code)
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
