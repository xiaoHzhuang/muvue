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
        <el-form-item label="执行器" prop="executor">
          <el-input v-model="ruleForm.executor"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item label="任务描述" prop="jobDesc">
          <el-input v-model="ruleForm.jobDesc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="路由策略" prop="executorRouteStrategy">
          <el-select v-model="ruleForm.executorRouteStrategy" placeholder="请选择路由策略" style="width:297px">
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
        <el-form-item label="Cron" prop="cron">
          <el-input v-model="ruleForm.cron"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="运行模式" prop="executorRunMode">
          <el-select v-model="ruleForm.executorRunMode" placeholder="请选择运行模式" style="width:297px">
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
        <el-form-item label="JobHandler" prop="jobHandler">
          <el-input v-model="ruleForm.jobHandler"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="阻塞处理策略" prop="executorBlockStrategy">
          <el-select v-model="ruleForm.executorBlockStrategy" placeholder="请选择阻塞处理策略" style="width:297px">
            <el-option label="单机串行" value="SERIAL_EXECUTION"></el-option>
            <el-option label="丢弃后续调度" value="DISCARD_LATER"></el-option>
            <el-option label="覆盖之前调度" value="COVER_EARLY"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item label="报警邮件" prop="alarmEmail">
          <el-input v-model="ruleForm.alarmEmail"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="任务超时时间">
          <!-- <el-input v-model="ruleForm.executorTimeout"></el-input> -->
          <el-input-number v-model="executorTimeout" @change="handleChange" :min="1" :max="10" label="单位秒"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item label="失败重试次数" prop="executorFailRetryCount">
          <el-input v-model="ruleForm.executorFailRetryCount"></el-input>
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
        executor: "",
        jobDesc: "",
        executorRouteStrategy: "",
        cron: "",
        executorRunMode: "",
        jobHandler: "",
        executorBlockStrategy: "",
        alarmEmail: "",
        executorTimeout: "",
        executorFailRetryCount: ""
      },
      rules: {
        executor: [
          { required: true, message: "请选择执行器", trigger: "change" }
        ],
        jobDesc: [
          { required: true, message: "请输入任务描述", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        executorRouteStrategy: [
          { required: true, message: "请选择路由策略", trigger: "change" }
        ],
        cron: [
          { required: true, message: "请设置cron表达式", trigger: "blur" }
        ],
        executorRunMode: [
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
        // executorTimeout: [
        //   { required: true, message: "请填写任务超时时间", trigger: "blur" }
        // ],
        executorFailRetryCount: [
          { required: true, message: "请填写失败重试次数", trigger: "blur" }
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
</style>