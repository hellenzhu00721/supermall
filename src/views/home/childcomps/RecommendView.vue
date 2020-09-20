<template>
  <div class="recommend">
    <div :key="item.index" v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.recommend {
  width: 100%;
  text-align: center;
  display: flex;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex-grow: 1;
}
.recommend-item img {
  width: 80%;
  height: "width";
  margin-bottom: 10px;
}
</style>
