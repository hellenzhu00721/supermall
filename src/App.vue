<template>
  <div id="app">
    <!-- 使用exclude要把组件名字传出去 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/maintabbar/MainTabBar";

export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style scoped>
@import "./assets/css/base.css";
</style>
