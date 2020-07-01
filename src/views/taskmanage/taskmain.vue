<template>
  <div>
    <el-table :data="tableData" border style="width: 100%;" :height="tableHeight">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="id" label="任务ID" width="150"></el-table-column>
      <el-table-column prop="jobDesc" label="任务描述" width="150"></el-table-column>
      <el-table-column prop="runMode" label="运行模式" width="150"></el-table-column>
      <el-table-column prop="cron" label="cron" width="150"></el-table-column>
      <el-table-column prop="creator" label="创建人" width="150"></el-table-column>
      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.status|statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="operation(scope.row.id)" type="text" size="small">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
const payTypeOptions = [
  { type: 0, name: "停止" },
  { type: 1, name: "启动" },
  { type: 2, name: "运行中" }
];
export default {
  data() {
    return {
      tableData: [],
      tableHeight: window.innerHeight - 188,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        let heightStyle = window.innerHeight - 190;
        this.tableHeight = heightStyle;
      })();
    };
  },
  components: {},

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      //   this.fetchMemberList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //   this.fetchMemberList();
    }
  },
  filters: {
    statusFilter() {}
  }
};
</script>

<style scoped>
</style>