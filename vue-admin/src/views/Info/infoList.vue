<template>
  <div id="searchBox">
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="20" class="search">
        <el-col :span="3">
          <el-form-item label="类别：">
            <el-select class="select-item" placeholder="请选择" v-model="category">
              <el-option
                :label="categoryItem.category_name"
                :value="categoryItem.id"
                v-for="categoryItem in categorys"
                :key="categoryItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="dataTime"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关键字：">
            <el-select v-model="key" class="select-item">
              <el-option label="ID" value="ID"></el-option>
              <el-option label="标题" value="标题"></el-option>
            </el-select>
          </el-form-item>
          <el-input v-model="seachInput" placeholder="请输入内容" class="searchInput"></el-input>
          <el-button type="danger" class="searchBtn" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="danger" class="addBtn" @click="addInfo">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="400" align="center"></el-table-column>
      <el-table-column
        prop="categoryId"
        label="类别"
        width="180"
        align="center"
        :formatter="toCategory"
      ></el-table-column>
      <el-table-column prop="createDate" label="日期" align="center" :formatter="toData"></el-table-column>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="infoBottom">
      <el-col :span="12">
        <el-button size="medium " @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 添加信息 -->
    <add-info :dialog_key="dialogTableVisible" :getList="getList"></add-info>
    <edit :edit_key="dialogTableVisible" :currentInfo="editInfo" :getList="getList"></edit>
  </div>
</template>

<script>
import addInfo from "views/Info/dialog/addInfo.vue";
import edit from "views/Info/dialog/edit.vue";
import { getInfoList, deleteInfo } from "api/infoList.js";
import { timestampToTime } from "utils/common.js";
export default {
  components: {
    addInfo,
    edit,
  },
  data() {
    return {
      category: "",
      categorys: "",
      dataTime: "",
      key: "ID",
      seachInput: "",
      total: 1,
      pages: {
        total: 1,
        pageNumber: 1,
        pageSize: 10,
      },
      selectInfo: [],
      dialogTableVisible: {
        keys1: false,
        keys2: false,
      },
      editInfo: {},
      tableData: [],
      loading: true,
    };
  },
  methods: {
    //修改数据
    edit(val) {
      this.dialogTableVisible.keys2 = true;
      this.editInfo = val;
    },
    //搜索状态还原
    reductionSearchFn() {
      (this.category = ""), (this.dataTime = ""), (this.seachInput = "");
    },
    //搜索
    search() {
      this.getList();
      this.reductionSearchFn();
    },
    //获取搜索数据
    getSearchData() {
      let requestData = {};
      //获取信息id
      if (this.category) {
        requestData.categoryId = this.category;
      }
      //获取日期
      if (this.dataTime.length > 0) {
        requestData.startTiem = this.dataTime[0];
        requestData.endTiem = this.dataTime[1];
      }
      this.key === "ID"
        ? (requestData.id = this.seachInput)
        : (requestData.title = this.seachInput);
      requestData.pageNumber = this.pages.pageNumber;
      requestData.pageSize = this.pages.pageSize;
      return requestData;
    },
    //格式化时间
    toData(row) {
      return timestampToTime(row.createDate);
    },

    //匹配类型
    toCategory(row) {
      let categoryName = "";
      this.categorys.filter((val, index) => {
        if (val.id == row.categoryId) {
          categoryName = val.category_name;
        }
      });
      return categoryName;
    },
    //存储多选信息
    handleSelectionChange(val) {
      this.selectInfo = val;
    },
    //每页条数
    handleSizeChange(val) {
      this.loading = true;
      this.pages.pageSize = val;
      this.getList();
    },
    //当前页
    handleCurrentChange(val) {
      this.loading = true;
      this.pages.pageNumber = val;
      this.getList();
    },
    //打开dialog
    addInfo() {
      this.dialogTableVisible.keys1 = true;
    },
    //删除提示信息
    deleteItem(currentData) {
      this.confirm({
        content: "是否删除当前信息",
      })
        .then((val) => {
          if (val === "confirm") {
            this.loading = true;
            this.selectInfo = currentData;
            this.deleteFn();
          }
        })
        .catch((val) => {
          this.$message({
            message: "取消删除",
          });
        });
    },
    //删除接口
    deleteFn() {
      let infoId = {
        id: [],
      };
      if (this.selectInfo instanceof Array) {
        //判断是批量删除还是单个删除,如果是批量删除则进行遍历,如果是单个删除直接添加
        infoId.id = this.selectInfo.map((val) => {
          return val.id;
        });
      } else {
        infoId.id.push(this.selectInfo.id);
      }
      deleteInfo(infoId).then((response) => {
        if (response.resCode === 0) {
          this.$message({
            type: "success",
            message: response.message,
          });
          this.getList();
        }
      });
    },
    //删除选中的信息
    deleteAll() {
      this.confirm({ content: "是否删除选中的信息" })
        .then((val) => {
          if (val === "confirm") {
            if (this.selectInfo == "") {
              return false;
            }
            this.loading = true;
            this.deleteFn();
          }
        })
        .catch((val) => {
          this.$message({
            message: "取消删除",
          });
        });
    },
    //获取信息列表
    getList() {
      let listData = this.getSearchData();
      getInfoList(listData)
        .then((val) => {
          this.pages.total = val.data.total;
          this.tableData = val.data.data;
          this.loading = false;
        })
        .catch((val) => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.$store.dispatch("info/getCategoryFn");
    this.categorys = JSON.parse(localStorage.getItem("categorys"));
    this.getList();
  },
};
</script>

<style scoped lang='scss'>
::v-deep .searchInput {
  width: 200px;
}
.searchBtn {
  margin-left: 5px;
}
.addBtn {
  width: 150px;
  float: right;
}
.select-item {
  width: 110px;
}
.left-btn {
  margin-top: 20px;
}
.infoBottom {
  margin-top: 20px;
}
.paging {
  float: right;
}
</style>