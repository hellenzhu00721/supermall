<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    //scroll方法的封装
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //首页监听item中图片加载完成的封装
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("---");
    },
    finishPullUp() {
      //上拉加载更多的封装
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll.y ? this.scroll.y : 0;
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      //在scoll里面的div、a标签设置了click属性为true才可以点击生效， 默认为false
      click: true,
      //给probetype属性设置动态绑定的值，需要实时监听需要传入probetype值 ，默认值0不实时监听
      //注意：动态绑定时用横杠命名：probe-type
      probeType: this.probeType,
      //布尔值设置为true时 实现上拉加载更多。为了实现独立封装，可以在父组件中动态传入布尔值
      pullUpLoad: this.pullUpLoad
    });
    this.scroll.on("scroll", position => {
      //这里可以拿到实时监听的数据,通过自定义事件传给父组件，用于backtop、详情页联动效果
      //console.log(position);
      this.$emit("scroll", position);
    });
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        // console.log("监听到拉到底部");
      });
    }
  }
};
</script>

<style scoped></style>
