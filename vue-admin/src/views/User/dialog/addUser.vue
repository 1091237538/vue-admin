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
      <el-form :model="form" label-position="left">
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
          <el-Select v-model="form.region.province">
            <el-option label="四川" value="1"></el-option>
          </el-Select>
          <span>市：</span>
          <el-Select v-model="form.region.city">
            <el-option label="泸州" value="2"></el-option>
          </el-Select>
          <span>区：</span>
          <el-Select v-model="form.region.area">
            <el-option label="龙马潭区" value="3"></el-option>
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
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    addUser_dialogKeys: {
      type: Object,
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
    };
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