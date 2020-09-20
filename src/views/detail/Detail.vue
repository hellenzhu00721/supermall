<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navClick="navClick" ref="navClick" />
    <scroll class="content" ref="scroll" @scroll="positionShow" :probe-type="3">
      <!-- <div>{{ $store.state.cartList }}</div> -->
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @goodsImageLoad="goodsImageLoad"
      />
      <detail-param-info :param-info="ParamInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isshowbacktop"></back-top>
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "@/network/detail.js";

import { debounce } from "@/common/utils";

import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";

import DetailNavBar from "./childcomps/DetailNavBar";
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParamInfo from "./childcomps/DetailParamInfo";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";
import DetailBottomBar from "./childcomps/DetailBottomBar";
import GoodsList from "@/components/content/goods/GoodsList";

export default {
  name: "Detail",
  components: {
    Scroll,
    BackTop,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      ParamInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopy: [],
      isshowbacktop: false
    };
  },
  created() {
    //获取ID
    this.iid = this.$route.params.iid;
    //请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;

      // this.goods是Goods的实例对象，。每个实例里面都有Goods构造函数封装的属性
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );

      this.shop = new Shop(res.result.shopInfo);

      this.detailInfo = res.result.detailInfo;

      this.ParamInfo = new GoodsParam(res.result.itemParams);

      if (res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0];
      }
      //在这里可以获取offsetTop的值但是值不对，因为图片还没加载完
      //offsetTop值不对的时候，都是因为图片的问题
      // this.$nextTick(() => {
      //   this.themeTopy.push(0);
      //   this.themeTopy.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopy.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopy.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopy);
      // });
    });
    //请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },
  methods: {
    goodsImageLoad() {
      //监听goods-info图片加载完刷新页面
      this.$refs.scroll.refresh();
      //图片加载完才可以获取各组件的offsettop值
      this.themeTopy = [];
      this.themeTopy.push(0);
      this.themeTopy.push(this.$refs.params.$el.offsetTop);
      this.themeTopy.push(this.$refs.comment.$el.offsetTop);
      this.themeTopy.push(this.$refs.recommends.$el.offsetTop);
      console.log(this.themeTopy);
    },
    navClick(index) {
      //获取完各组件的offsettop值，实现联动第一步
      //导航栏的联动：1.点击tabcontrol，页面跳转某个位置
      this.$refs.scroll.scrollTo(0, -this.themeTopy[index], 200);
    },
    positionShow(position) {
      //导航栏的联动：2.当滚到某个位置，自动切换tabcontrol
      // console.log(position);
      const positionY = -position.y;
      if (positionY > 0 && positionY < this.themeTopy[1]) {
        this.$refs.navClick.currentIndex = 0;
      } else if (
        positionY > this.themeTopy[1] &&
        positionY < this.themeTopy[2]
      ) {
        this.$refs.navClick.currentIndex = 1;
      } else if (
        positionY > this.themeTopy[2] &&
        positionY < this.themeTopy[3]
      ) {
        this.$refs.navClick.currentIndex = 2;
      } else if (positionY > this.themeTopy[3]) {
        this.$refs.navClick.currentIndex = 3;
      }

      //拿到scroll子组件传进来的position（x，y）值,判断backtop什么时候显示
      //console.log(position);
      this.isshowbacktop = -position.y > 1000;
    },
    backClick() {
      //点击backtop，调用scrollto方法，回到顶部
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车里
      this.$store.dispatch("addCart", product).then(res => {
        this.$toast.show(res, 2000);
      });
    }
  },
  mounted() {
    //监听推荐图片加载完成 在goodslistitem监听，但是有这个，首页图片的监听就又出现偶尔滚不动bug
    const newrefresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("detailItemImageLoad", () => {
      newrefresh();
      // this.$refs.scroll.refresh();
    });
  }
};
</script>

<style scoped>
#detail {
  /* 由于tabbar是定位元素层级高，给detail设置相对定位盖住tabbar */
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  /* 顶部导航栏固定 */
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* goodsImageLoad取元素的offsetTop需要最近的定位父元素 */
  /* scroll滚动需要设置一个高度才能滚。有两种设置滚动区域的方法：定位和calc函数 */
  /* 100%是相对于父元素的，而父元素的高度是由子元素撑开的，所以很大，所以要给父元素设置高度100视口 */
  /* position: relative;
  height: calc(100% - 44px - 49px); */

  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
</style>
