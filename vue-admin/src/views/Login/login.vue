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
        <el-form-item prop="checkPass2" v-show="model=='zhuce'">
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
              <el-button class="blcok" type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm') " class="blcok submit-btn">{{text[current].name}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  testEmail,
  testPass,
  testYzCode
} from "@/utils/validate.js";
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
      current: 0,
      model: "denglu",
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
    active(index, name) {
      this.current = index;
      name == "登录" ? (this.model = "denglu") : (this.model = "zhuce");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
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

<style lang="scss" scoped>
#login {
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
<style >
.el-form-item__label {
  color: #fff;
}
</style>