<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap"  size="small" class="demo-form-inline searchForm">
      <el-form-item prop="goodsName" style="width:150px">
        <el-input v-model="searchMap.goodsName" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="goodsCode" style="width:150px">
        <el-input v-model="searchMap.goodsCode" placeholder="商品编码"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName" style="width:150px">
        <el-input
          readonly
          @click.native="openSearchSupplierDialog"
          v-model="searchMap.supplierName"
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
      <el-table-column prop="goodsName" label="商品名称"></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码"></el-table-column>
      <el-table-column prop="goodsSize" label="商品规格"></el-table-column>
      <el-table-column prop="salePrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="size" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商">
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
        <el-form-item prop="goodsName" label="商品名称">
          <el-input v-model="goodsForm.goodsName" width="150px"></el-input>
        </el-form-item>
        <el-form-item prop="goodsCode" label="商品编码">
          <el-input v-model="goodsForm.goodsCode"></el-input>
        </el-form-item>
        <el-form-item prop="goodsSize" label="商品规格">
          <el-input v-model="goodsForm.goodsSize"></el-input>
        </el-form-item>
        <el-form-item prop="salePrice" label="零售价">
          <el-input v-model="goodsForm.salePrice"></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice" label="进货价">
          <el-input v-model="goodsForm.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item prop="size" label="库存数量">
          <el-input v-model="goodsForm.size"></el-input>
        </el-form-item>
        <el-form-item prop="supplierName" label="供应商">
          <el-input readonly @click.native="openSupplierDialog" v-model="goodsForm.supplierName"></el-input>
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
import goodsApi from "@/api/goods/goods";
export default {
  data() {
    return {
      searchMap: {
        goodsName: "",
        goodsCode: "",
        supplierName: "",
        supplierId: ""
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableHeight: window.innerHeight - 200,
      dialogFormVisible: false,
      rules: {},
      goodsForm:{
        id: "",
        goodsName: "",
        goodsCode: "",
        goodsSize: "",
        salePrice: "",
        purchasePrice: "",
        size: "",
        supplierName: "",
        supplierId: ""
      },
      supplierDialogVisible: false,
      formAdd: false,
      formSearch: false,
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsCode: [
          { required: true, message: "请输入商品代号", trigger: "blur" }
        ],
        supplierName:[
          { required: true, message: "请选择供应商", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchList();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        let heightStyle = window.innerHeight - 200;
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
        this.goodsForm.supplierId=response.data.supplier.id;
        this.goodsForm.supplierName=response.data.supplier.supplierName;
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
        this.searchMap.supplierName = currentRow.supplierName;
        this.searchMap.supplierId = currentRow.id;
        this.supplierDialogVisible = false;
        this.formSearch = false;
      } else {
        this.goodsForm.supplierName = currentRow.supplierName;
        this.goodsForm.supplierId = currentRow.id;
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