<template>
  <div class="bottom-bar">
    <div class="checkcontent">
      <check-button
        class="checkbutton"
        :ischecked="isSelectAll"
        @click.native="selectAllClick"
      />
      <span>全选</span>
    </div>
    <div class="totol-price">合计：{{ totolPrice }}</div>
    <div class="check-length">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "@/components/content/checkbutton/CheckButton";
export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totolPrice() {
      return (
        "¥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked;
      }).length;
    },

    isSelectAll() {
      if (this.cartList.length == 0) {
        return false;
      }

      //三种方法：

      // return !this.cartList.filter(item => {
      //   return !item.checked;
      // }).length;

      // 对象类型转换成布尔值为true，取反为false
      return !this.cartList.find(item => {
        return !item.checked;
      });

      // return (
      //   this.cartList.filter(item => {
      //     return item.checked;
      //   }).length == this.cartList.length
      // );
    }
  },
  methods: {
    selectAllClick(isSelectAll) {
      isSelectAll = this.isSelectAll;
      this.$store.commit("selectAllClick", isSelectAll);
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  display: flex;
  text-align: center;
}
.checkcontent {
  /* background-color: darkgrey; */
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 80px;
}
.checkbutton {
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.totol-price {
  flex-grow: 1;
}
.check-length {
  background-color: rgb(248, 139, 120);
  border-radius: 35%;
  width: 120px;
}
</style>
