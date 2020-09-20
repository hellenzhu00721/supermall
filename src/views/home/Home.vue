<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      :pull-up-load="true"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        :pull-up-load="true"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isshowbacktop"></back-top>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "@/network/home";
import { debounce } from "@/common/utils";

import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendView from "./childcomps/RecommendView";
import FeatureView from "./childcomps/FeatureView";
import TabControl from "@/components/content/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currenttype: "pop",
      isshowbacktop: false,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    this.getData();
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currenttype].list;
    }
  },
  mounted() {
    //图片加载完成的事件监听
    const newrefresh = debounce(this.$refs.scroll.refresh, 0);
    this.$bus.$on("itemImageLoad", () => {
      newrefresh();
    });
  },

  destroyed() {
    console.log("首页销毁");
  },

  activated() {
    //进来的时候调用
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //离开的时候调用
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
  },

  methods: {
    swiperImageLoad() {
      //监听轮播图图片加载完成->计算吸顶效果的offsettop
      // console.log(this.$refs.tabControl.$el.offsetTop);//537
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    loadMore() {
      // console.log("监听到上拉加载更多");
      this.getGoods(this.currenttype);
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currenttype = "pop";
          break;

        case 1:
          this.currenttype = "new";
          break;

        case 2:
          this.currenttype = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    contentScroll(position) {
      //拿到scroll子组件传进来的position（x，y）值
      //console.log(position);
      this.isshowbacktop = -position.y > 1000;

      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    getData() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //console.log(res);
        // 要把变量保存起来，把一个数组结构插入到另一个数组里
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 上拉加载多次
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style scoped>
#home {
  height: 100vh;
  /* padding-top: 44px; */
}
.home-nav {
  color: white;
  background-color: rgb(248, 139, 120);

  /* 使用浏览器原生滚动时，为了让导航不跟随一起滚动
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10; */
}
.tab-control {
  /* tabcontrol本来就是在navbar下面固定 但是由于scroll是固定定位 层级高，所以需要提升层级 提升层级需要定位 */
  position: relative;
  z-index: 9;
}

.content {
  position: fixed;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

/* .tab-control {
   原生滚动 可以检查滚动的位置 一旦放在scroll里就检测不到滚动位置了 ;
  position: sticky;
  top: 44px;
  z-index: 9;
} */
</style>
