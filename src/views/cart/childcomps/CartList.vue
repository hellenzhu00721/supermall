<template>
  <div class="cartlist">
    <cart-list-item
      :key="index"
      v-for="(item, index) in cartList"
      :itemInfo="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  data() {
    return {};
  },
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style scoped></style>
