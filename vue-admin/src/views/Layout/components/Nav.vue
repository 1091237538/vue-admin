<template>
  <div id="console_nav">
    <img src="~assets/img/logo.png" :class="{size:isCollapse}" class="vStyle" />
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#344a5f"
      text-color="#fff"
      router
    >
      <el-submenu :key="indexx" :index="indexx+''" v-for="(item,indexx) in navList">
        <!-- 一级菜单 -->
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <!-- 子集菜单 -->
        <el-menu-item
          v-for="(subitem,index) in item.children "
          :key="index"
          :index="subitem.path"
          @click="active(`${indexx}-${index}`)"
          :class="{active:currentIndex==`${indexx}-${index}`}"
        >{{subitem.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: "",
      navList: [
        {
          name: "控制台",
          meta: {
            icon: "el-icon-coordinate"
          },
          children: [
            {
              name: "首页",
              path: "/consoleIndex"
            }
          ]
        },
        {
          name: "信息管理",
          meta: {
            icon: "el-icon-document"
          },
          children: [
            {
              name: "信息列表",
              path: "/infoList"
            },
            {
              name: "信息分类",
              path: "/infoClass"
            }
          ]
        },
        {
          name: "用户管理",
          meta: {
            icon: "el-icon-user-solid"
          },
          children: [
            {
              name: "用户列表",
              path: "/userList"
            }
          ]
        }
      ]
    };
  },
  methods: {
    active(val) {
      this.currentIndex = val;
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.navState;
    }
  }
};
</script>

<style lang="scss" scoped>
#console_nav {
  height: 100vh;
  background: #344a5f;
}
::v-deep .el-menu {
  border: 0;
}
.active {
  background: pink !important;
  color: #344a5f !important;
}
.vStyle {
  width: 100px;
  margin: 20px 75px;
  transition: all 0.3s;
}
.size {
  width: 40px;
  margin: 20px 10px;
}
</style>