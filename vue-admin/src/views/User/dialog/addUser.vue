<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="addUser_dialogKeys.key1"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <el-form :model="form" label-position="left" ref="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" style="margin-left:36px"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="地区" class="region_box">
          <span>省：</span>
          <el-Select v-model="form.region.province" @change="getCity">
            <el-option
              :label="item.PROVINCE_NAME"
              :value="item.PROVINCE_CODE"
              v-for="item in Regin_Data.provinceData"
              :key="item.PROVINCE_ID"
            ></el-option>
          </el-Select>
          <span>市：</span>
          <el-Select v-model="form.region.city" @change="getArea">
            <el-option
              :label="item.CITY_NAME"
              :value="item.CITY_CODE"
              v-for="item in citys"
              :key="item.CITY_ID"
            ></el-option>
          </el-Select>
          <span>区：</span>
          <el-Select v-model="form.region.area">
            <el-option
              :label="item.AREA_NAME"
              :value="item.AREA_CODE"
              v-for="item in areas"
              :key="item.AREA_ID"
            ></el-option>
          </el-Select>
        </el-form-item>
        <el-form-item label="是否启用">
          <div class="state_box">
            <el-radio v-model="form.state" label="1">禁用</el-radio>
            <el-radio v-model="form.state" label="2">启用</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="角色">
          <div class="role_box">
            <el-radio v-model="form.role" label="1">系统管理员</el-radio>
            <el-radio v-model="form.role" label="2">信息管理员</el-radio>
            <el-radio v-model="form.role" label="3">用户管理员</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, getReginInfo } from "api/user.js";
export default {
  props: {
    addUser_dialogKeys: {
      type: Object,
    },
    Regin_Data: {
      type: Object,
    },
    getUser_list: {
      type: Function,
    },
  },
  data() {
    return {
      form: {
        username: "",
        name: "",
        tel: "",
        region: {
          province: "",
          city: "",
          area: "",
        },
        state: "",
        role: "",
      },
      citys: [],
      areas: [],
    };
  },
  methods: {
    submit() {
      if (this.form.username == "" && this.form.tel == "") {
        return false;
      }
      let user_Data = {
        username: this.form.username,
        truename: this.form.name,
        password: "",
        phone: this.form.tel,
        region: JSON.stringify(this.form.region),
        status: this.form.state,
        role: this.form.role,
      };
      addUser(user_Data).then((response) => {
        if (response.resCode === 0) {
          this.addUser_dialogKeys.key1 = false;
          this.getUser_list();
          this.resetForm();
        }
      });
    },
    close() {
      console.log(this.Regin_Data.provinceData);
    },
    //获取市级地区信息
    getCity(val) {
      let cityData = {
        type: "city",
        province_code: val,
      };
      getReginInfo(cityData).then((val) => {
        this.citys = val.data.data;
      });
      this.reset();
    },
    //获取区级地区信息
    getArea(val) {
      this.form.region.area = "";
      let areaData = {
        type: "area",
        city_code: val,
      };
      getReginInfo(areaData).then((val) => {
        this.areas = val.data.data;
      });
    },
    //重置省份信息
    reset() {
      this.form.region.city = "";
      this.form.region.area = "";
    },
    //重置表单信息
    resetForm(formName) {
      this.form = {
        username: "",
        name: "",
        tel: "",
        region: {
          province: "",
          city: "",
          area: "",
        },
        state: "",
        role: "",
      };
    },
  },
};
</script>

<style lang='scss' scoped>
.el-input {
  width: 430px;
  margin-left: 23px;
}
.el-select {
  width: 118px;
}
.region_box {
  span {
    margin-left: 10px;
  }
}
.role_box {
  .el-radio {
    margin-left: 38px;
  }
}
.state_box {
  .el-radio {
    margin-left: 10px;
  }
}
.dialog-footer {
  .el-button {
    width: 120px;
  }
}
</style>