<template>
  <div id="searchBox">
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="20" class="search">
        <el-col :span="3">
          <el-form-item label="类别：">
            <el-select v-model="category" class="select-item" placeholder="请选择">
              <el-option label="国际信息" value="国际信息"></el-option>
              <el-option label="国内信息" value="国内信息"></el-option>
              <el-option label="社会信息" value="社会信息"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="value1"
              type="daterange"
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
          <el-button type="danger" class="searchBtn">搜索</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="danger" class="addBtn" @click="addInfo">添加</el-button>
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
      <el-table-column prop="date" label="标题" width="400" align="center"></el-table-column>
      <el-table-column prop="name" label="类别" width="180" align="center"></el-table-column>
      <el-table-column prop="address" label="日期" align="center"></el-table-column>
      <el-table-column prop="address" label="管理人" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItem">删除</el-button>
          <el-button size="mini" @click="dialogTableVisible.keys=true" type="success">编辑</el-button>
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
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 添加信息 -->
    <add-info :dialog_key="dialogTableVisible"></add-info>
  </div>
</template>

<script>
import addInfo from "views/Info/dialog/addInfo.vue";
export default {
  components: {
    addInfo,
  },
  data() {
    return {
      category: "",
      value1: "",
      key: "ID",
      seachInput: "",
      dialogTableVisible: {
        keys: false,
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    addInfo() {
      this.dialogTableVisible.keys = true;
    },
    handleSelectionChange() {},
    deleteItem() {
      this.confirm({
        content: "是否删除当前信息",
         fn:this.remove
      });
    },
    deleteAll() {
      this.confirm({
        content: "是否删除选中的信息",
        fn:this.remove
      });
    },
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