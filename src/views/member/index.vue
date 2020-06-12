<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline searchForm">
      <el-form-item prop="cardNum" style="width:150px">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name" style="width:150px">
        <el-input v-model="searchMap.name" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item prop="payType" style="width:150px">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option
            v-for="payTypeOption in payTypeOptions"
            :label="payTypeOption.name"
            :value="payTypeOption.type"
            :key="payTypeOption.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday" style="width:150px">
        <el-date-picker
          type="date"
          placeholder="出生日期"
          v-model="searchMap.birthday"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:150px">
        <el-button type="primary" icon="el-icon-search" @click="fetchMemberList" width="50px">查询</el-button>
        <el-button type="primary" icon="el-icon-search" @click="openDialog" width="50px">新增</el-button>
        <el-button @click="resetForm('searchForm')" width="50px">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%;" :height="tableHeight">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="id" label="会员卡号" width="100"></el-table-column>
      <el-table-column prop="memberName" label="会员姓名" width="80"></el-table-column>
      <el-table-column prop="memberPhone" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="memberCredit" label="可用积分" width="80"></el-table-column>
      <el-table-column prop="openCardMoney" label="开卡金额" width="80"></el-table-column>
      <el-table-column prop="payType" label="支付类型" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.payType|payTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="memberAddress" label="会员地址" width="80"></el-table-column>
      <el-table-column prop="memberBirthday" label="会员生日">
        <template slot-scope="scope">
          <span>{{scope.row.memberBirthday|dataFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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
    <el-dialog title="新增会员" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        ref="memberForm"
        :model="memberForm"
        size="small"
        label-position="right"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item prop="memberName" label="会员名称">
          <el-input v-model="memberForm.memberName" width="150px"></el-input>
        </el-form-item>
        <el-form-item prop="memberPhone" label="手机号码">
          <el-input v-model="memberForm.memberPhone"></el-input>
        </el-form-item>
        <el-form-item prop="memberCredit" label="可用积分">
          <el-input v-model="memberForm.memberCredit"></el-input>
        </el-form-item>
        <el-form-item prop="openCardMoney" label="开卡金额">
          <el-input v-model="memberForm.openCardMoney"></el-input>
        </el-form-item>
        <el-form-item prop="memberAddress" label="会员地址">
          <el-input v-model="memberForm.memberAddress"></el-input>
        </el-form-item>
        <el-form-item prop="payType" label="支付类型">
          <el-select v-model="memberForm.payType">
            <el-option
              v-for="payTypeOption in payTypeOptions"
              :label="payTypeOption.name"
              :value="payTypeOption.type"
              :key="payTypeOption.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="memberBirthday" label="出生日期">
          <el-date-picker type="date" v-model="memberForm.memberBirthday" value-format="yyyy-MM-dd"></el-date-picker>
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
import memberApi from "@/api/member";
const payTypeOptions = [
  { type: 1, name: "现金" },
  { type: 2, name: "微信" },
  { type: 3, name: "支付宝" }
];
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        cardNum:"",
        name:"",
        payType:null,
        birthday:null
      },
      tableHeight: window.innerHeight -200,
      payTypeOptions: payTypeOptions,
      dialogFormVisible: false,
      memberForm: {
        id: null,
        memberName: "",
        memberPhone: "",
        memberCredit: 0,
        openCardMoney: 0,
        memberAddress: "",
        payType: "",
        memberBirthday: ""
      },
      rules: {
        name: [{ required: true, message: "请输入会员名称", trigger: "blur" }],
        payType: [
          { required: true, message: "请输入支付类型", trigger: "blur" }
        ],
        birthday: [
          { required: true, message: "请输入生日日期", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchMemberList();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        let heightStyle = window.innerHeight - 200;
        this.tableHeight = heightStyle;
      })();
    };
  },
  components: {},

  methods: {
    fetchMemberList() {
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
        
          this.total = response.data.totalSize;
          this.tableData = response.data.content;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log("handleSizeChange");
      this.fetchMemberList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log("handleCurrentChange");
      this.fetchMemberList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEditClick(id) {
      this.openDialog();
      memberApi.getMemberById(id).then(response => {
        this.memberForm = response.data;
      });
    },
    handleDeleteClick(id) {
      this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          memberApi.deleteById(id).then(response => {
            if (response.data.code=="1") {
              this.fetchMemberList();
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
        this.$refs["memberForm"].resetFields();
      });
    },
    save() {
      this.$refs["memberForm"].validate(valid => {
        if (valid) {
          memberApi.saveMember(this.memberForm).then(response => {
            var resp = response.data;
            if (resp.code) {
              this.fetchMemberList();
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
    }
  },
  filters: {
    payTypeFilter(type) {
      var obj = null;
      for (var i = 0; i < payTypeOptions.length; i++) {
        var temObj = payTypeOptions[i];
        if (temObj.type == type) {
          obj = temObj;
          break;
        }
      }
      return obj ? obj.name : null;
    },
    dataFormat(fmt) {
      return new Date(fmt).Format("yyyy-MM-dd hh:mm:ss");
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