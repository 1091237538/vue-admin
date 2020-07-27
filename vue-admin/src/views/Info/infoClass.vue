<template>
  <div id="infoCategory">
    <el-button type="danger" @click="swFirstCategory">添加一级分类</el-button>
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
                  <el-button type="success" round @click="swSecondCategory(fristItem)">添加子集</el-button>
                  <el-button round @click="deleteItem(fristItem.id)">删除</el-button>
                </div>
              </h4>
              <ul>
                <li v-for="childrenItem in  fristItem.children" :key="childrenItem.id">
                  {{childrenItem.category_name}}
                  <div class="btns">
                    <el-button type="danger" round @click="edit2(childrenItem)">编辑</el-button>
                    <el-button round @click="deleteItem(childrenItem.id)">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">{{menu_name}}</h4>
          <el-form ref="form" :model="form">
            <el-form-item label="一级分类名称：" v-if="first_key">
              <el-input v-model.trim="form.first_name" :disabled="first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="second_key">
              <el-input v-model.trim="form.second_name" :disabled="second_disabled"></el-input>
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
  deleteCategory,
  modifyCategory,
  AddSecondCategory,
  getAllCategory,
} from "api/news.js";

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
      menu_name: "一级分类名称",
      btn_type: "",
      edit_Data: {},
      second_Data: {},
      categoryType: "",
    };
  },
  methods: {
    //判断是添加还是编辑
    submit_type() {
      if (this.form.first_name === "" && this.form.second_name === "") {
        this.$message({
          message: "菜单名称不能为空",
          type: "warning",
        });
        return;
      }
      if (this.btn_type === "添加") {
        this.second_Data["categoryName"] = this.form.second_name;
        this.menu_name === "一级分类名称"
          ? this.addCategoryFn()
          : this.addSecondCategory(this.second_Data);
      } else if (this.btn_type === "编辑") {
        this.menu_name == "一级分类编辑"
          ? (this.edit_Data["categoryName"] = this.form.first_name)
          : (this.edit_Data["categoryName"] = this.form.second_name);
        this.editFristCategory(this.edit_Data);
      }
    },
    //切换到一级分类添加模块
    swFirstCategory() {
      this.btn_type = "添加";
      this.menu_name = "一级分类名称";
      this.form.first_name = "";
      this.first_key = true;
      this.second_key = false;
      this.first_disabled = false;
      this.add_disabled = false;
    },
    //切换到二级分类添加模块
    swSecondCategory(data) {
      this.btn_type = "添加";
      this.menu_name = "二级分类名称";
      this.form.second_name = "";
      this.first_key = false;
      this.second_key = true;
      this.first_disabled = true;
      this.second_disabled = false;
      this.add_disabled = false;
      if (!data) {
        return false;
      }
      let newData = {
        parentId: data.id,
      };
      this.form.first_name = data.category_name;
      this.second_Data = newData;
    },
    //添加一级分类
    addCategoryFn() {
      let data = {
        categoryName: this.form.first_name,
      };
      AddFirstCategory(data).then((val) => {
        if (val.resCode === 0) {
          this.$message({
            message: "添加成功！！",
            type: "success",
          });
          this.reductionFn();
          this.addNewCategory(val.data);
        } else if (val.resCode === 1040) {
          this.$message({
            message: "添加失败",
            type: "error",
          });
        }
      });
    },
    //添加一级分类后,更新分类显示
    addNewCategory(data) {
      this.categorys.push(data);
    },
    //添加二级分类
    addSecondCategory(data) {
      AddSecondCategory(data).then((val) => {
        if (val.resCode === 0) {
          this.$message({
            type: "success",
            message: val.message,
          });
          this.reductionFn();
          this.getSecondCategoryFn(data.parentId, val.data);
        } else {
          this.$message({
            type: "error",
            message: val.message,
          });
          this.reductionFn();
        }
      });
    },

    //添加二级分类后更新列表
    getSecondCategoryFn(id, data) {
      this.categorys.filter((val, index) => {
        if (val.id === id) {
          this.categorys[index].children.push(data);
        }
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
        this.reductionFn();
      });
    },
    //删除分类后,更新分类显示
    deleteNewCategory(data) {
      let currentIndex = "";
      this.categorys.filter((parentVal, parentIndex) => {                                  //判断是否有子集分类
        if (parentVal["children"]) {   
          parentVal["children"].filter((childrenVal, childrenIndex) => {
            if (data === childrenVal.id) {
              this.categorys[parentIndex].children.splice(childrenIndex,1)
            }
          });
        } else {
          if (data === parentVal.id) {
            currentIndex = parentIndex;
            this.categorys.splice(currentIndex, 1);
          }
        }
      });
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
    //编辑分类
    edit(val) {
      this.swFirstCategory();
      this.form.first_name = val.category_name;
      this.menu_name = "一级分类编辑";
      this.btn_type = "编辑";
      this.edit_Data = {
        id: val.id,
      };
    },
    edit2(val) {
      this.swSecondCategory();
      this.form.second_name = val.category_name;
      this.menu_name = "二级分类编辑";
      this.btn_type = "编辑";
      this.edit_Data = {
        id: val.id,
      };
    },
    //编辑分类信息
    editFristCategory(data) {
      modifyCategory(data).then((val) => {
        if (val.resCode === 0) {
          this.$message({
            message: val.message,
            type: "success",
          });
          this.reductionFn();
          this.getAllFn();
        } else {
          this.$message({
            message: val.message,
            type: "error",
          });
        }
      });
    },

    //还原状态
    reductionFn() {
      this.form.first_name = "";
      this.form.second_name = "";
      this.btn_type = "";
      this.edit_Data = "";
      this.second_Data = "";
      this.first_key = true;
      this.second_key = true;
      this.first_disabled = true;
      this.second_disabled = true;
      this.add_disabled = true;
      this.menu_name = "一级分类名称";
    },
    //分类页获取所有分类
    getAllFn() {
      getAllCategory().then((val) => {
        let newArr = val.data.sort((a, b) => {
          return a.id - b.id;
        });
        this.categorys = newArr;
      });
    },
  },
  mounted() {
    this.$store.dispatch("info/getCategoryFn");
    this.categorys = JSON.parse(localStorage.getItem("categorys"));
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