<template>
  <div id="console_index" :class="{'close':menuStates}">
    <el-container>
      <el-aside width="250px">
        <LayoutNav></LayoutNav>
      </el-aside>
      <el-container>
        <el-header height="75px">
          <LayoutHeader></LayoutHeader>
        </el-header>
        <el-main>
          <LayoutMain></LayoutMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LayoutHeader from "views/Layout/components/Header.vue";
import LayoutMain from "views/Layout/components/Main.vue";
import LayoutNav from "views/Layout/components/Nav.vue";

export default {
  data() {
    return {};
  },
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  computed: {
    menuStates() {
      return this.$store.state.app.navState;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-header {
  padding: 0;
  z-index: 999;
}
::v-deep .el-main {
  background: #f7f7f7;
}
.el-aside {
  transition: all 0.3s;
}
.close {
  .el-aside {
    width: 64px !important;
  }
}
</style>