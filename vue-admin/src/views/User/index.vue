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
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="username" label="邮箱/用户名" width="250" align="center"></el-table-column>
      <el-table-column prop="truename" label="真实姓名" width="150" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="250" align="center"></el-table-column>
      <el-table-column prop="region" label="地区" width="250" align="center" :formatter="toRegion"></el-table-column>
      <el-table-column prop="role" label="角色" width="250" align="center" :formatter="toRole"></el-table-column>
      <el-table-column label="禁启用状态" width="100" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            active-color="#13ce66"
            inactive-color="red"
            active-value="2"
            inactive-value="1"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleted(scope.row)">删除</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="user_Buttom">
      <el-row>
        <el-col :span="8">
          <el-button @click="deletedAll">批量删除</el-button>
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
    <addUser
      :addUser_dialogKeys="addUser_dialogKeys"
      :Regin_Data="getReginInfo"
      :getUser_list="getAllUserFn"
    ></addUser>
  </div>
</template>

<script>
import { getAllUser, getReginInfo, deleteUser } from "api/user.js";
import addUser from "views/User/dialog/addUser.vue";
export default {
  data() {
    return {
      form: {
        region: "",
        content: "",
      },
      tableData: [],
      pages: {
        total: 1,
      },
      addUser_dialogKeys: {
        key1: false,
      },
      getReginInfo: {
        provinceData: [],
      },
      tabData: [],
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange(val) {
      this.tabData = val;
    },
    //新增用户打开dialog
    addUser() {
      this.addUser_dialogKeys.key1 = true;
    },
    //获取省份信息
    getRegin() {
      let data = {
        type: "province",
      };
      getReginInfo(data).then((val) => {
        this.getReginInfo["provinceData"] = val.data.data;
      });
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
    //格式化角色数据
    toRole(row) {
      switch (row.role) {
        case "1":
          return "系统管理员";
          break;
        case "2":
          return "信息管理员";
          break;
        case "3":
          return "用户管理员";
          break;
      }
    },

    //格式化地区数据
    toRegion(row) {
      let getRegion = JSON.parse(row.region);
      let region_data = {
        type: "province",
      };
      let proData = this.getReginInfo.provinceData;
      let proName = "";
      proData.filter((val) => {
        if (val.PROVINCE_CODE === getRegion.province) {
          proName = val.PROVINCE_NAME;
        }
      });
      return proName;
    },
    //用户删除
    delete_user(userId) {
      let delete_data = {
        id: [],
      };
      if (userId instanceof Array) {
        let Ids = userId.map((val) => {
          return val.id;
        });
        delete_data["id"] = Ids;
      } else {
        delete_data.id.push(userId);
      }
      deleteUser(delete_data).then((response) => {
        if (response.resCode === 0) {
          this.$message({
            message: response.message,
            type: "success",
          });
          this.addUser_dialogKeys.key1 = false;
          this.getAllUserFn();
        }
      });
    },
    //删除提示
    deleted(user) {
      this.confirm({
        content: "是否删除当前用户",
      })
        .then((val) => {
          this.delete_user(user.id);
        })
        .catch((val) => {
          this.$message({
            message: "取消删除",
          });
        });
    },
    //批量删除
    deletedAll() {
      this.deletedAll_message()
        .then((val) => {
          if (this.tabData == "") {
            this.$message({
              message: "未选中用户",
              type: "error",
            });
            return false;
          }
          this.delete_user(this.tabData);
        })
        .catch((val) => {
          this.$message({
            message: "取消删除",
          });
        });
    },
    //批量删除提示
    deletedAll_message() {
      return Promise.resolve(
        this.confirm({
          content: "是否删除选中的用户",
        })
      );
    },
  },
  mounted() {
    this.getAllUserFn();
    this.getRegin();
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