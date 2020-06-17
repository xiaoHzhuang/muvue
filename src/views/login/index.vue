<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="55px" class="login-form">
      <h1 class="login-title">后台管理系统</h1>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="subBtn" type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
      <p class="smalltxt">
        <router-link class="a" to="#">忘记密码</router-link>
        <router-link class="a" to @click.native="registerFormVisible = true">免费注册</router-link>
      </p>
    </el-form>
    <!--用户注册对话框-->
    <el-dialog title="用户注册" :visible.sync="registerFormVisible" width="450px">
      <el-form
        :model="registerForm"
        :rules="registerRules"
        label-width="100px"
        status-icon
        size="mini"
        ref="registerForm"
      >
        <el-form-item label="用户代码" :label-width="formLabelWidth" prop="username">
          <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="usercaption">
          <el-input v-model="registerForm.usercaption" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" prop="pwd">
          <el-input type="password" v-model="registerForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPassword">
          <el-input type="password" v-model="registerForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" :label-width="formLabelWidth" prop="email">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register('registerForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";
import registerApi from "@/api/register";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassword !== "") {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
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
      },
      registerFormVisible: false,
      registerForm: {
        userid:"",
        username: "",
        usercaption: "",
        phone: "",
        pwd: "",
        email: "",
        checkPassword: ""
      },
      formLabelWidth: "80px",
      registerRules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 60,
            message: "长度在 3 到 60 个字符",
            trigger: "blur"
          },
          {
            pattern: /^(\w){3,60}$/,
            message: "只能输入6-20个字母、数字、下划线"
          }
        ],
        usercaption: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 60, message: "长度在 3 到 60 个字符", trigger: "blur" }
        ],
        email: [
          { required: false, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 60,
            message: "长度在 3 到 60 个字符",
            trigger: "blur"
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱账号"
          }
        ],
        phone: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 60,
            message: "长度在 3 到 60 个字符",
            trigger: "blur"
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号码"
          }
        ],
        pwd: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, message: "请再次输入用户密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("Login", this.form).then(response => {
            if (response.status==1) {
              this.$store.dispatch("initRoutes");
              this.$router.push("/home");
            } else {
              this.$message({
                message: response.msg,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          registerApi.registerForm(this.registerForm).then(response => {
            var resp = response.data;
            console.log(resp);
            if (resp.code) {
              this.registerFormVisible = false;
               this.$message({
                message: "注册成功",
                type: "success"
              });
            } else {
              this.$message({
                message: resp.msg,
                type: "warning"
              });
            }
          });
        }else {
          return false;
        }
      });
    }
  }
};
</script>


<style scoped lang="scss">
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
.subBtn {
  width: 100%;
}
.smalltxt {
  text-align: right;
  .a {
    text-decoration: none;
    color: #999999;
    font-size: 12px;
    margin-left: 8px;
  }
}
</style>