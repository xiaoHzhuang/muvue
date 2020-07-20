<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap"  size="small" class="demo-form-inline searchForm">
      <el-form-item prop="supplierName" style="width:100px">
        <el-input v-model="searchMap.supplierName" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item prop="contactPerson" style="width:100px">
        <el-input v-model="searchMap.contactPerson" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="phone" style="width:100px">
        <el-input v-show="!isDialog" v-model="searchMap.phone" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:5px">
        <el-button type="primary" icon="el-icon-search" @click="fetchSupplierList" width="50px">查询</el-button>
        <el-button v-show="!isDialog" type="primary" icon="el-icon-search" @click="openDialog" width="50px">新增</el-button>
        <el-button v-show="!isDialog" @click="resetForm('searchForm')" width="50px">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%;" :height="tableHeight" :highlight-current-row="isDialog" @current-change="clickOneRow">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="supplierName" label="供应商名称" ></el-table-column>
      <el-table-column prop="contactPerson" label="联系人" ></el-table-column>
      <el-table-column v-if="!isDialog" prop="phone" label="联系电话" ></el-table-column>
      <el-table-column v-if="!isDialog" prop="remark" label="备注" ></el-table-column>
      <el-table-column v-if="!isDialog" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEditClick(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteClick(scope.row.id)" type="danger" size="small">删除</el-button>
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
    <el-dialog title="新增供应商" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        ref="supplierForm"
        :model="supplierForm"
        size="small"
        label-position="right"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item prop="supplierName" label="供应商名称">
          <el-input v-model="supplierForm.supplierName" width="150px"></el-input>
        </el-form-item>
        <el-form-item prop="contactPerson" label="联系人">
          <el-input v-model="supplierForm.contactPerson"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话">
          <el-input v-model="supplierForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input v-model="supplierForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import supplierApi from '@/api/supplier/supplier'
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        supplierName:"",
        contactPerson:"",
        phone:""
      },
      tableHeight: window.innerHeight - 200,
      dialogFormVisible: false,
      supplierForm: {
        id: null,
        supplierName: "",
        contactPerson: "",
        phone: "",
        remark: ""
      },
      rules: {
        supplierName: [
          { required: true, message: "请输入供应商名称", trigger: "blur" }
        ],
        contactPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ]
      }
    };
  },
  props:{
    isDialog:Boolean
  },
  components: {},
  created() {
    this.fetchSupplierList();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        let heightStyle = window.innerHeight - 200;
        this.tableHeight = heightStyle;
        console.log("AAAA");
      })();
    };
  },
  methods: {
    fetchSupplierList() {
      supplierApi.getSupplierList(this.currentPage,this.pageSize,this.searchMap).then(response=>{
          this.total = response.data.totalSize;
          this.tableData = response.data.content;
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchSupplierList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchSupplierList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEditClick(id) {
      this.openDialog();
      supplierApi.getSupplierById(id).then(response => {
        this.supplierForm = response.data;
      });
    },
    handleDeleteClick(id) {
      this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          supplierApi.deleteById(id).then(response => {
            if (response.data.code=="1") {
              this.fetchSupplierList();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openDialog() {
      this.dialogFormVisible = true;
      //this.$nextTick()是一个异步事件，当渲染结束后，它的回调函数才会被执行，
      //弹出窗口打开之后，需要加载dom,需要花费时间，应该等待加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
      this.$nextTick(() => {
        this.$refs["supplierForm"].resetFields();
      });
    },
    save() {
      this.$refs["supplierForm"].validate(valid => {
        if (valid) {
          supplierApi.saveSupplier(this.supplierForm).then(response => {
            var resp = response.data;
            if (resp.code) {
              this.fetchSupplierList();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: "保存失败",
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    clickOneRow(currentRow){
       this.$emit('option-supplier',currentRow);
    }
  }
};
</script>

<style scoped>
.searchForm {
  height: 50px;
  padding-top: 10px;
}
</style>