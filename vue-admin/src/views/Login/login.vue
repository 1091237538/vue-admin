<template>
  <div id="login">
    <div class="login-box">
      <ul class="sw-nav">
        <li
          v-for="(item,index) in text"
          :key="index"
          @click="active(index,item.name),resetForm('ruleForm')"
          :class="{'swnav-active':current==index}"
        >{{item.name}}</li>
      </ul>
      <!--表单 start-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        size="medium"
      >
        <el-form-item prop="email">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass2" v-if="model=='register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.checkPass2"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="yzCode">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model="ruleForm.yzCode" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button class="blcok" type="success" @click="getSms" :disabled="key">{{yzText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="blcok submit-btn"
          >{{text[current].name}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import {
  stripscript,
  testEmail,
  testPass,
  testYzCode
} from "@/utils/validate.js";
import { GetSms, loginIn, registers } from "api/login.js";
export default {
  data() {
    //验证邮箱
    var email = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (testEmail(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    //验证密码
    var checkPass = (rule, value, callback) => {
      this.ruleForm.checkPass = stripscript(value);
      value = this.ruleForm.checkPass;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (testPass(value)) {
        callback(
          new Error("至少6-20个字符，至少1个大写字母，1个小写字母和1个数字")
        );
      } else {
        callback();
      }
    };
    //验证重复密码
    var checkPass2 = (rule, value, callback) => {
      if (this.model === "denglu") {
        callback();
      }
      this.ruleForm.checkPass2 = stripscript(value);
      value = this.ruleForm.checkPass2;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.checkPass) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    //验证验证码
    var yzCode = (rule, value, callback) => {
      this.ruleForm.yzCode = stripscript(value);
      value = this.ruleForm.yzCode;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (testYzCode(value)) {
        callback(new Error("验证码格式不正确"));
      } else {
        callback();
      }
    };
    return {
      text: [{ name: "登录" }, { name: "注册" }],
      yzText: "获取验证码",
      key: false,
      yzTime: "",
      current: 0,
      model: "login",
      ruleForm: {
        email: "",
        checkPass: "",
        yzCode: "",
        checkPass2: ""
      },
      rules: {
        email: [{ validator: email, trigger: "blur" }],
        checkPass: [{ validator: checkPass, trigger: "blur" }],
        checkPass2: [{ validator: checkPass2, trigger: "blur" }],
        yzCode: [{ validator: yzCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    //切换模块
    active(index, name) {
      this.current = index;
      clearInterval(this.yzTime);
      this.key = false;
      this.yzText = "获取验证码";
      name == "登录" ? (this.model = "login") : (this.model = "register");
    },
    // 登录，注册提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 登录
          if (this.model == "login") {
            let data = {
              username: this.ruleForm.email,
              password: sha1(this.ruleForm.checkPass),
              code: this.ruleForm.yzCode
            };
            this.$store
              .dispatch("login/login", data)
              .then(val => {
                this.valiForms(val);
                if (val.resCode === 0) {
                  const loading = this.$loading({
                    lock: true,
                    text: "登录成功即将跳转页面",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                  });
                  setTimeout(() => {
                    loading.close();
                    this.$router.push({
                      path: "/Console"
                    });
                  }, 2000);
                }
              })
              .catch(val => {
                this.$message({
                  showClose: true,
                  message: "登录超时",
                  duration: 1000,
                  type: "error"
                });
              });

            // 注册
          } else if (this.model == "register") {
            let data = {
              username: this.ruleForm.email,
              password: sha1(this.ruleForm.checkPass),
              code: this.ruleForm.yzCode
            };
            registers(data)
              .then(val => {
                this.valiForms(val);
                if (val.resCode === 0) {
                  const loading = this.$loading({
                    lock: true,
                    text: "注册成功即将跳转到登录页面",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                  });
                  setTimeout(() => {
                    loading.close();
                    location.reload();
                  }, 2000);
                }
              })
              .catch(val => {
                this.$message({
                  showClose: true,
                  message: "网络请求超时",
                  duration: 1000,
                  type: "error"
                });
              });
          } else {
            return;
          }
        } else {
          return false;
        }
      });
    },
    //判断用户，密码，验证码是否有误
    valiForms(val) {
      switch (val.resCode) {
        case 1004:
          this.$message({
            showClose: true,
            message: "用户名或密码错误",
            duration: 1000,
            type: "error"
          });
          break;
        case 1005:
          this.$message({
            showClose: true,
            message: "验证码不匹配",
            duration: 1000,
            type: "error"
          });
          break;
        case 200:
          this.$message({
            showClose: true,
            message: "当前邮箱已被注册",
            duration: 1000,
            type: "error"
          });
      }
    },
    //清除表单数据
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取验证码
    getSms() {
      if (this.ruleForm.email == "") {
        this.$message({
          showClose: true,
          message: "邮箱不能为空",
          type: "warning"
        });
        return;
      }
      let data = {
        username: this.ruleForm.email,
        model: this.model
      };
      let Time = 60;
      GetSms(data)
        .then(val => {
          this.$message({
            showClose: true,
            duration: 10000,
            message: val.message,
            type: "success"
          });
          const Times = () => {
            this.key = true;
            if (Time == 0) {
              this.yzText = "获取验证码";
              this.key = false;
              clearInterval(this.yzTime);
              return;
            }
            Time--;
            this.yzText = `重新获取：${Time}s`;
          };
          Times();
          this.yzTime = setInterval(Times, 1000);
        })
        .catch(val => {
          this.$message({
            showClose: true,
            message: "网络请求超时",
            duration: 1000,
            type: "error"
          });
        });
    }
  },
  beforeDestroy() {
    this.$message.closeAll(); //跳转路由清除所有message
    clearInterval(this.yzTime); //清除定时器
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  background: #344a5f;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 380px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  justify-content: center;

  align-items: center;
}
.sw-nav {
  width: 170px;
  display: flex;
  justify-content: center;
  li {
    list-style: none;
    flex: 1;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    cursor: pointer;
  }
}
.swnav-active {
  background: rgba(0, 0, 0, 0.1);
}
.blcok {
  display: block;
  width: 100%;
}
.submit-btn {
  margin-top: 12px;
}
</style>


