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
            <el-option label="国际信息" value="国际信息"></el-option>
            <el-option label="国内信息" value="国内信息"></el-option>
            <el-option label="社会信息" value="社会信息"></el-option>
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
        <el-button @click="dialog_key.keys = false" size='medium' style='width:120px'>取 消</el-button>
        <el-button type="danger" @click="dialog_key.keys = false" style='width:120px'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        region: "",
        textarea: "",
        
      },
    };
  },
  props: {
    dialog_key: {
      type: Object,
    },
  },
  methods: {
    cls() {
      this.dialog_key.keys = false;
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