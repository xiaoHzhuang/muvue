<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-top:6px" size="small">
      <el-form-item label="执行器">
        <el-select v-model="formInline.handlerCaption" placeholder="执行器名称">
          <el-option v-for="item in handlerCaptions" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="formInline.status" placeholder="状态" style="width:80px;margin-left:20px">
          <el-option label="全部" value="2"></el-option>
          <el-option label="停止" value="0"></el-option>
          <el-option label="启动" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jobHandler" placeholder="请输入JobHandler"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="success" @click="addHandler">新增</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="新增任务" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <add-job></add-job>
    </el-dialog>
  </div>
</template>

<script>
import AddJob from "./addJob.vue";
export default {
  data() {
    return {
      formInline: {
        user: "",
        handlerCaption: "",
        status: "2",
        creator: ""
      },
      handlerCaptions: [
        {
          label: "示例执行器",
          value: "1"
        }
      ],
      jobHandler: "",
      dialogVisible: false
    };
  },

  components: { AddJob },

  methods: {
    search() {},
    addHandler() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
</style>