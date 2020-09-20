<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div
          :key="item.index"
          v-for="(item, index) in titles"
          class="title-item"
          @click="itemClick(index)"
          :class="{ active: index == currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "detailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("navClick", index);
    },
    backClick() {
      //   this.$router.go(-1);
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex-grow: 1;
}
.active {
  color: coral;
}
.back {
  margin-top: 7px;
}
</style>
