<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialog_key.keys"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cls"
      center
    >
      <el-form :model="form">
        <el-form-item label="类型：">
          <el-select v-model="form.region" placeholder="请选择" class="select-item">
            <el-option
              :label="categoryItem.category_name"
              :value="categoryItem.id"
              v-for="categoryItem in categorys"
              :key="categoryItem.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input v-model="form.title" placeholder="请输入内容" class="content-item"></el-input>
        </el-form-item>
        <el-form-item label="概括：">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.textarea"
            :rows="6"
            resize="none"
            class="content-item"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_key.keys = false" size="medium" style="width:120px">取 消</el-button>
        <el-button type="danger" @click="addInfoFn" style="width:120px">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addInfo } from "api/infoList.js";
export default {
  data() {
    return {
      form: {
        title: "",
        region: "",
        textarea: "",
      },
      categorys: [],
    };
  },
  props: {
    dialog_key: {
      type: Object,
    },
    getList: {
      type: Function,
    },
  },
  methods: {
    cls() {
      this.dialog_key.keys = false;
    },
    addInfoFn() {
      if (
        this.form.title === "" &&
        this.form.region === "" &&
        this.form.textarea === ""
      ) {
        this.$message({
          type: "error",
          message: "请输入内容",
        });
        return;
      }
      this.dialog_key.keys = false;
      let infoData = {
        categoryId: this.form.region,
        title: this.form.title,
        content: this.form.textarea,
      };
      addInfo(infoData).then((val) => {
        if (val.resCode === 0) {
          this.$message({
            type: "success",
            message: val.message,
          });
          this.getList();
          this.reductionFn();
        } else {
          this.$message({
            type: "error",
            message: val.message,
          });
        }
      });
    },
    //还原状态
    reductionFn() {
      this.form.title = "";
      (this.form.textarea = ""), (this.form.region = "");
    },
  },
  mounted() {
    this.categorys = JSON.parse(localStorage.getItem("categorys"));
  },
};
</script>

<style scoped lang='scss'>
.select-item {
  width: 150px;
}
.content-item {
  width: 400px;
}
::v-deep .el-form {
  margin-top: 20px;
  margin-left: 20px;
}
</style>