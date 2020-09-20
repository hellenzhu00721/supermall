<template>
  <div>
    <nav-bar class="navbar">
      <div slot="center">购物车({{ cartListCount }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>
    <cart-bottom-bar class="cart-bottom-bar" />
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
import { mapGetters } from "vuex";
import Scroll from "@/components/common/scroll/Scroll";

import CartList from "./childcomps/CartList";
import CartBottomBar from "./childcomps/CartBottomBar";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed: {
    ...mapGetters(["cartListCount"])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
.navbar {
  background-color: rgb(248, 139, 120);
  color: cornsilk;
}
.content {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 89px;
  overflow: hidden;
}
.cart-bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
}
</style>
