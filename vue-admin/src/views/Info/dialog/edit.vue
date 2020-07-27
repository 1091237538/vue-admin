<template>
  <div>
    <el-dialog
      title="修改"
      :visible.sync="edit_key.keys2"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <el-form :model="form">
        <el-form-item label="ID：">
          <el-input v-model="form.id" style="width:120px;margin-left:12px"></el-input>
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
        <el-button size="medium" style="width:120px" @click="edit_key.keys2=false">取 消</el-button>
        <el-button type="danger" style="width:120px" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editInfo } from "api/infoList.js";
export default {
  props: {
    edit_key: {
      type: Object,
    },
    currentInfo: {
      type: Object,
    },
    getList: {
      type: Function,
    },
  },
  data() {
    return {
      form: {
        title: "",
        id: "",
        textarea: "",
      },
      categorys: [],
      key: true,
      currentEdit: {},
    };
  },
  methods: {
    //修改信息
    submitEdit() {
      let data = {
        id: this.currentEdit.id,
        categoryId: this.currentEdit.categoryId,
        title: this.form.title,
        content: this.form.textarea,
      };
      editInfo(data)
        .then((response) => {
          if (response.resCode === 0) {
            this.$message({
              type: "success",
              message: response.message,
            });
            this.edit_key.keys2 = false;
            this.getList();
          } else {
            this.$message({
              type: "error",
              message: response.message,
            });
          }
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: response.message,
          });
        });
    },
  },
  watch: {
    currentInfo(val) {
      this.form.id = val.id;
      this.form.textarea = val.content;
      this.form.title = val.title;
      this.currentEdit = val;
    },
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