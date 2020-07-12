<template>
  <div id="console_header">
    <div class="pull-left" @click="navChange">
      <svg-icon icon-class="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <svg-icon icon-class="admin"></svg-icon>
      <span class="user-info">
        <span style="color:red">{{this.username}}</span>
      </span>
      <span @click="exit">
        <svg-icon icon-class="loginout"></svg-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { removeToken, removeUserName, getUserName } from "utils/app.js";
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    navChange() {
      this.$store.commit("app/navChange");
    },
    exit() {
      const h = this.$createElement;
      this.$msgbox({
        title: "message",
        message: h("p", null, [h("i", { style: "color: teal" }, "是否退出?")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            this.$store.dispatch("login/exit").then(() => {
              const loading = this.$loading({
                lock: true,
                text: "退出成功,即将跳转到登录页",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              setTimeout(() => {
                loading.close();
                this.$router.push({
                  name: "login"
                });
                done();
              }, 1500);
            });
          } else {
            done();
          }
        }
      });
    }
  },
  created() {
    this.username = getUserName();
  }
};
</script>

<style lang="scss" scoped>
#console_header {
  height: 75px;
  line-height: 75px;
  background: #fff;
  padding: 0 20px;
  box-shadow: 0px 0px 16px 0 rgba(0, 0, 0, 0.1);
}
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
.svg-icon {
  margin-bottom: -8px;
  width: 26px;
  height: 26px;
  cursor: pointer;
}
.user-info {
  height: 100%;
  padding: 0 20px;
}
</style>