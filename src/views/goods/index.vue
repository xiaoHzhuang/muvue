<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline searchForm">
      <el-form-item prop="goodsname" style="width:150px">
        <el-input v-model="searchMap.goodsname" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="goodscode" style="width:150px">
        <el-input v-model="searchMap.goodscode" placeholder="商品编码"></el-input>
      </el-form-item>
      <el-form-item prop="suppliername" style="width:150px">
        <el-input
          readonly
          @click.native="openSearchSupplierDialog"
          v-model="searchMap.suppliername"
          placeholder="供应商"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left:150px">
        <el-button type="primary" icon="el-icon-search" @click="fetchList" width="50px">查询</el-button>
        <el-button type="primary" icon="el-icon-search" @click="openDialog" width="50px">新增</el-button>
        <el-button @click="resetForm('searchForm')" width="50px">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%;" :height="tableHeight">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="goodscode" label="商品编码"></el-table-column>
      <el-table-column prop="goodssize" label="商品规格"></el-table-column>
      <el-table-column prop="saleprice" label="零售价"></el-table-column>
      <el-table-column prop="purchaseprice" label="进货价"></el-table-column>
      <el-table-column prop="size" label="库存数量"></el-table-column>
      <el-table-column prop="suppliername" label="供应商">
        <template slot-scope="scope">{{scope.row.supplier.supplierName}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
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
    <el-dialog title="新增商品" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        ref="goodsForm"
        :model="goodsForm"
        size="small"
        label-position="right"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item prop="goodsname" label="商品名称">
          <el-input v-model="goodsForm.goodsname" width="150px"></el-input>
        </el-form-item>
        <el-form-item prop="goodscode" label="商品编码">
          <el-input v-model="goodsForm.goodscode"></el-input>
        </el-form-item>
        <el-form-item prop="goodssize" label="商品规格">
          <el-input v-model="goodsForm.goodssize"></el-input>
        </el-form-item>
        <el-form-item prop="saleprice" label="零售价">
          <el-input v-model="goodsForm.saleprice"></el-input>
        </el-form-item>
        <el-form-item prop="purchaseprice" label="进货价">
          <el-input v-model="goodsForm.purchaseprice"></el-input>
        </el-form-item>
        <el-form-item prop="size" label="库存数量">
          <el-input v-model="goodsForm.size"></el-input>
        </el-form-item>
        <el-form-item prop="suppliername" label="供应商">
          <el-input readonly @click.native="openSupplierDialog" v-model="goodsForm.suppliername"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择供应商" :visible.sync="supplierDialogVisible" width="500px">
      <supplier :isDialog="true" @option-supplier="optionSupplier"></supplier>
    </el-dialog>
  </div>
</template>

<script>
import Supplier from "@/views/supplier";
import goodsApi from "@/api/goods";
export default {
  data() {
    return {
      searchMap: {
        goodsname: "",
        goodscode: "",
        suppliername: "",
        supplierid: ""
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableHeight: window.innerHeight - 213,
      dialogFormVisible: false,
      rules: {},
      goodsForm:{
        id: "",
        goodsname: "",
        goodscode: "",
        goodssize: "",
        saleprice: "",
        purchaseprice: "",
        size: "",
        suppliername: "",
        supplierid: ""
      },
      supplierDialogVisible: false,
      formAdd: false,
      formSearch: false,
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodscode: [
          { required: true, message: "请输入商品代号", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.fetchList();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        let heightStyle = window.innerHeight - 213;
        this.tableHeight = heightStyle;
      })();
    };
  },
  components: { Supplier },
  methods: {
    fetchList() {
      goodsApi.getList(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          this.total = response.data.totalSize;
          this.tableData = response.data.content;
        });
    },
    openDialog() {
      this.dialogFormVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEditClick(id) {
      this.openDialog();
      goodsApi.getById(id).then(response => {
        console.log(response.data);
        this.goodsForm = response.data;
        this.goodsForm.supplierid=response.data.supplier.id;
        this.goodsForm.suppliername=response.data.supplier.supplierName;
      });
    },
    handleDeleteClick(id) {
      this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsApi.deleteById(id).then(response => {
            if (response.data.code == "1") {
              this.fetchList();
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
    handleSizeChange() {},
    handleCurrentChange() {},
    save() {
      this.$refs["goodsForm"].validate(valid => {
        if (valid) {
          goodsApi.saveGoods(this.goodsForm).then(response => {
            var resp = response.data;
            if (resp.code) {
              this.fetchList();
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
    openSupplierDialog() {
      this.supplierDialogVisible = true;
      this.formAdd = true;
    },
    openSearchSupplierDialog() {
      this.supplierDialogVisible = true;
      this.formSearch = true;
    },
    optionSupplier(currentRow) {
      if (this.formSearch) {
        this.searchMap.suppliername = currentRow.supplierName;
        this.searchMap.supplierid = currentRow.id;
        this.supplierDialogVisible = false;
        this.formSearch = false;
      } else {
        this.goodsForm.suppliername = currentRow.supplierName;
        this.goodsForm.supplierid = currentRow.id;
        this.supplierDialogVisible = false;
        this.formAdd = false;
      }
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