<template>
  <swiper>
    <swiper-item :key="item.index" v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: Array
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isload: false
    };
  },
  methods: {
    imageload() {
      if (!this.isload) {
        this.$emit("swiperImageLoad");
        this.isload = true;
      }
    }
  }
};
</script>
<style scoped></style>
