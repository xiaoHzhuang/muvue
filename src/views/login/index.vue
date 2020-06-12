<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
      <h1 class="login-title">管理系统</h1>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入有效账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('Login',this.form).then(response=>{
            if(response.flag){
               this.$store.dispatch('initRoutes');
               this.$router.push("/home");
            }else{
               this.$message({
                  message: respToken.msg,
                  type: "warning"
                });  
            }
          })
        } else {
          return false;
        }
      });
    }
  }
};
</script>


<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  padding: 30px;
  border-radius: 20px;
  background-color: rgb(255, 255, 255, 0.8);
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../../assets/login.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.login-title {
  text-align: center;
}
</style>