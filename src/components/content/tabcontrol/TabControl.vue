<template>
  <div class="tab-control">
    <div
      :key="item.index"
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{ active: currentIndex == index }"
      @click="itemclick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  },
  components: {}
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: coral;
}
.active span {
  padding: 5px;
  border-bottom: coral solid 3px;
}
</style>
