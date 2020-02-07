<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="营销主ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="营销主名称">
        <template slot-scope="scope">
          <span>{{ scope.row.actName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{
            scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')
          }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="注册资金">
        <template slot-scope="scope">
          <span>{{ scope.row.actCostCount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="注册地址">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.channelCode }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.channelCode }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="营业执照">
        <template slot-scope="scope">
          <span>{{ scope.row.channelCode }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.channelCode }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核营销主" width="120">
        <template slot-scope="scope">
          <router-link :to="'/activity/review/' + scope.row.actCode">
            <el-button type="primary" size="small" icon="el-icon-edit">
              审核
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchSaleRoleList } from '@/api/role'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchSaleRoleList(this.listQuery)
        .then(response => {
          console.log(response)
          // this.list = response.data
          // this.total = response.data.total
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
