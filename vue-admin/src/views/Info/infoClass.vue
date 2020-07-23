<template>
  <div id="infoCategory">
    <el-button type="danger" @click="addFirstCategory">添加一级分类</el-button>
    <el-divider></el-divider>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="categoryBox">
            <div class="category" v-for="fristItem in categorys" :key="fristItem.id">
              <h4>
                <svg-icon icon-class="add"></svg-icon>
                {{fristItem.category_name}}
                <div class="btns">
                  <el-button type="danger" round @click="edit(fristItem)">编辑</el-button>
                  <el-button type="success" round @click="addSecondCategory">添加子集</el-button>
                  <el-button round @click="deleteItem(fristItem.id)">删除</el-button>
                </div>
              </h4>
              <ul>
                <li v-for="childrenItem in  fristItem.children" :key="childrenItem.id">
                  {{childrenItem.category_name}}
                  <div class="btns">
                    <el-button type="danger" round>编辑</el-button>
                    <el-button round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">{{frist_menu_name}}</h4>
          <el-form ref="form" :model="form">
            <el-form-item label="一级分类名称：" v-if="first_key">
              <el-input v-model.trim="form.first_name" :disabled="first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="second_key">
              <el-input v-model.trim="form.first_name" :disabled="second_disabled"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submit_type" :disabled="add_disabled">确定</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  AddFirstCategory,
  getCategory,
  deleteCategory,
  modifyCategory,
} from "api/news.js";
import { stripscript } from "utils/validate.js";
export default {
  data() {
    return {
      form: {
        first_name: "",
        second_name: "",
      },
      categorys: [],
      first_key: true,
      second_key: true,
      first_disabled: true,
      second_disabled: true,
      add_disabled: true,
      frist_menu_name: "一级分类名称",
      btn_type: "",
      edit_FristData: "",
    };
  },
  methods: {
    //切换到一级分类添加模块
    addFirstCategory() {
      this.btn_type = "添加";
      this.frist_menu_name = "一级分类名称";
      this.form.first_name = "";
      this.first_key = true;
      this.second_key = false;
      this.first_disabled = false;
      this.add_disabled = false;
    },
    //切换到二级分类添加模块
    addSecondCategory() {
      this.btn_type = "添加";
      this.frist_menu_name = "二级分类名称";
      this.form.second_name = "";
      this.first_key = false;
      this.second_key = true;
      this.second_disabled = false;
      this.add_disabled = false;
    },
    //添加分类
    addCategoryFn() {
      let data = {
        categoryName: stripscript(this.form.first_name),
      };
      AddFirstCategory(data).then((val) => {
        if (val.resCode === 0) {
          this.$message({
            message: "添加成功！！",
            type: "success",
          });
          this.form.first_name = "";
          this.addNewCategory(val.data);
        } else if (val.resCode === 1040) {
          this.$message({
            message: "添加失败",
            type: "error",
          });
        }
      });
    },
    //判断是添加还是编辑
    submit_type() {
      if (this.form.first_name === "") {
        this.$message({
          message: "菜单名称不能为空",
          type: "warning",
        });
        return;
      }
      if (this.btn_type === "添加") {
        this.addCategoryFn();
      } else if (this.btn_type === "编辑") {
        this.edit_FristData["categoryName"] = this.form.first_name;
        this.editFristCategory(this.edit_FristData);
      }
    },
    //添加分类后,更新分类显示
    addNewCategory(data) {
      this.categorys.push(data);
    },
    //删除分类后,更新分类显示
    deleteNewCategory(data) {
      let currentIndex = "";
      this.categorys.filter((val, index) => {
        if (data === val.id) {
          currentIndex = index;
        }
      });
      this.categorys.splice(currentIndex, 1);
    },
    //删除提示
    deleteItem(id) {
      this.confirm({
        content: "是否删除当前类",
      })
        .then((val) => {
          if (val == "confirm") {
            this.deleteFn(id);
          }
        })
        .catch((val) => {
          this.$message("取消删除");
        });
    },
    //删除分类
    deleteFn(id) {
      let data = {
        categoryId: id,
      };
      deleteCategory(data).then((val) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.deleteNewCategory(id);
      });
    },
    //编辑分类
    edit(val) {
      this.addFirstCategory();
      this.form.first_name = val.category_name;
      this.frist_menu_name = "一级菜单编辑";
      this.btn_type = "编辑";
      this.edit_FristData = {
        id: val.id,
      };
    },
    //编辑一级分类信息
    editFristCategory(data) {
      modifyCategory(data)
        .then((val) => {
          this.$message({
            message: "修改成功！！",
            type: "success",
          });
          this.form.first_name = "";
          this.getCategoryFn()
        })
        .catch((val) => {
          this.$message({
            message: "修改失败",
            type: "error",
          });
        });
    },
    //获取分类信息
    getCategoryFn() {
      return getCategory().then((val) => {
        if (val.resCode === 0) {
          let newArr = val.data.data.sort((a, b) => {
            return a.id - b.id;
          });
          this.categorys = newArr;
        }
      });
    },
  },
  mounted() {
    this.getCategoryFn();
  },
};
</script>

<style lang='scss' scoped>
.category {
  position: relative;
  margin-left: 10px;
  &::before {
    content: "";
    width: 32px;
    height: 100%;
    left: -2px;
    position: absolute;
    border-left: 1px dashed #000;
  }
  h4 {
    position: relative;
    width: 504px;
    left: -36px;
    margin: 0;
    padding-left: 20px;
    z-index: 999;
  }
  li {
    padding-left: 40px;
    position: relative;
    &::before {
      content: "";
      width: 32px;
      left: 0px;
      top: 21px;
      position: absolute;
      border-bottom: 1px dashed #000;
    }
  }
  h4,
  li {
    transition: all 0.3s ease;
    height: 44px;
    line-height: 44px;
    cursor: pointer;
    &:hover {
      background: #f3f3f3;
      .btns {
        display: block;
      }
    }
  }
}
.svg-icon {
  width: 30px;
  height: 20px;
  vertical-align: middle;
}
.categoryBox {
  div:first-child {
    &::before {
      top: 30px;
    }
  }
  div:last-child {
    &::before {
      bottom: 22px;
    }
  }
}
.btns {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.3s ease;
  .el-button {
    margin: 4.5px 0;
    height: 35px;
    line-height: 12px;
    margin-right: 8px;
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 40px;
  background: #f3f3f3;
}
.el-form {
  padding-left: 80px;
  margin-top: 20px;
  width: 420px;
  ::v-deep .el-input {
    width: 300px;
  }
  .el-button {
    margin-left: 110px;
    width: 120px;
  }
}
</style>