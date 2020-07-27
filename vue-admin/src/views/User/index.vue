<template>
  <div id="User">
    <el-form ref="form" :model="form">
      <el-row>
        <el-col :span="18">
          <el-col :span="6">
            <el-form-item label="关键字：">
              <el-Select v-model="form.region">
                <el-option label="国际信息一" value="1"></el-option>
              </el-Select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="form.content" placeholder="请输入内容" style="width:200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-button type="danger" class="userBtns">搜索</el-button>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="add_right">
            <el-button type="danger" class="userBtns" @click="addUser">新增</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="user" label="邮箱/用户名" width="250" align="center"></el-table-column>
      <el-table-column prop="name" label="真实姓名" width="150" align="center"></el-table-column>
      <el-table-column prop="tel" label="手机号" width="250" align="center"></el-table-column>
      <el-table-column prop="region" label="地区" width="250" align="center"></el-table-column>
      <el-table-column prop="admin" label="角色" width="250" align="center"></el-table-column>
      <el-table-column label="禁启用状态" width="100" align="center">
        <el-switch
          v-model="state_key"
          active-color="#13ce66"
          inactive-color="#cccccc"
          @change="swState"
        ></el-switch>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="danger" size="mini">删除</el-button>
        <el-button type="success" size="mini">编辑</el-button>
      </el-table-column>
    </el-table>
    <div class="user_Buttom">
      <el-row>
        <el-col :span="8">
          <el-button>批量删除</el-button>
        </el-col>
        <el-col :span="16">
          <div class="bottom_page">
            <el-pagination
              class="paging"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pages.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 新增dialog -->
    <addUser :addUser_dialogKeys="addUser_dialogKeys"></addUser>
  </div>
</template>

<script>
import { getAllUser } from "api/user.js";
import addUser from "views/User/dialog/addUser.vue";
export default {
  data() {
    return {
      state_key: false,
      form: {
        region: "",
        content: "",
      },
      tableData: [],
      pages: {
        total: 1,
      },
      addUser_dialogKeys: {
        key1: true,
      },
    };
  },
  methods: {
    swState(val) {
      this.state_key = val;
    },
    handleSizeChange() {},
    handleCurrentChange() {},

    //新增用户打开dialog
    addUser() {
      this.addUser_dialogKeys.key1 = true;
    },

    //获取用户列表
    getAllUserFn() {
      let user_Data = {
        username: "",
        truename: "",
        phone: "",
        pageNumber: 1,
        pageSize: 10,
      };
      getAllUser(user_Data).then((response) => {
        this.tableData = response.data.data;
      });
    },
  },
  mounted() {
    this.getAllUserFn();
  },
  components: {
    addUser,
  },
};
</script>

<style scoped lang='scss'>
.add_right,
.bottom_page {
  float: right;
}
.userBtns {
  width: 100px;
}
.user_Buttom {
  margin-top: 20px;
}
</style>