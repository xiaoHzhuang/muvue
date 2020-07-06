<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
    size="mini"
  >
    <el-row>
      <el-col :span="11">
        <el-form-item label="执行器" prop="jobGroup">
          <el-input v-model="ruleForm.jobGroup" class="width_200"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item label="任务描述" prop="jobDesc">
          <el-input v-model="ruleForm.jobDesc" class="width_200"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="任务路由策略" prop="executorRouteStrategy">
          <el-select
            v-model="ruleForm.executorRouteStrategy"
            placeholder="请选择任务路由策略"
            class="width_200"
          >
            <el-option label="第一个" value="FIRST"></el-option>
            <el-option label="最后一个" value="LAST"></el-option>
            <el-option label="轮询" value="ROUND"></el-option>
            <el-option label="随机" value="RANDOM"></el-option>
            <el-option label="一致性HASH" value="CONSISTENT_HASH"></el-option>
            <el-option label="最不经常使用" value="LEAST_FREQUENTLY_USED"></el-option>
            <el-option label="最近最久未使用" value="LEAST_RECENTLY_USED"></el-option>
            <el-option label="故障转移" value="FAILOVER"></el-option>
            <el-option label="忙碌转移" value="BUSYOVER"></el-option>
            <el-option label="分片广播" value="SHARDING_BROADCAST"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item label="Cron表达式" prop="jobCron">
          <el-input v-model="ruleForm.jobCron" class="width_200"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="任务运行模式" prop="glueType">
          <el-select v-model="ruleForm.glueType" placeholder="请选择任务运行模式" class="width_200">
            <el-option label="BEAN" value="BEAN"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item label="JobHandler" prop="jobHandler">
          <el-input v-model="ruleForm.jobHandler" class="width_200"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="阻塞处理策略" prop="executorBlockStrategy">
          <el-select
            v-model="ruleForm.executorBlockStrategy"
            placeholder="请选择阻塞处理策略"
            class="width_200"
          >
            <el-option label="单机串行" value="SERIAL_EXECUTION"></el-option>
            <el-option label="丢弃后续调度" value="DISCARD_LATER"></el-option>
            <el-option label="覆盖之前调度" value="COVER_EARLY"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item label="任务报警邮件" prop="alarmEmail">
          <el-input v-model="ruleForm.alarmEmail" class="width_200"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="任务超时时间"  prop="executorTimeout"   placeholder="单位（S）">
          <el-input v-model="ruleForm.executorTimeout" class="width_200"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item label="失败重试次数" prop="executorFailRetryCount">
           <el-input v-model="ruleForm.executorFailRetryCount" class="width_200"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        jobGroup: "",
        jobDesc: "",
        executorRouteStrategy: "",
        jobCron: "",
        glueType: "BEAN",
        jobHandler: "",
        executorBlockStrategy: "",
        alarmEmail: "",
        executorTimeout: 60,
        executorFailRetryCount: 3
      },
      rules: {
        jobGroup: [
          { required: true, message: "请选择执行器", trigger: "change" }
        ],
        jobDesc: [
          { required: true, message: "请输入任务描述", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        executorRouteStrategy: [
          { required: true, message: "请选择路由策略", trigger: "change" }
        ],
        jobCron: [
          { required: true, message: "请设置cron表达式", trigger: "blur" }
        ],
        glueType: [
          { required: true, message: "请选择运行模式", trigger: "change" }
        ],
        jobHandler: [
          { required: true, message: "请填写JobHandler", trigger: "blur" }
        ],
        executorBlockStrategy: [
          { required: true, message: "请选择阻塞处理策略", trigger: "change" }
        ],
        alarmEmail: [
          { required: true, message: "请填写报警邮件", trigger: "blur" }
        ],
        executorTimeout:[
          {required: false, message: "请正确填写超时时间",type:"number", trigger: "blur"}
        ],
        executorFailRetryCount:[
          {required: false, message: "请正确填写失败重试次数",type:"number", trigger: "blur"}
        ]
      }
    };
  },

  components: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.width_200{
  width:200px;
}
</style>