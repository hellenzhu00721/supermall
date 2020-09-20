import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state, oldProduct) {
      oldProduct.count += 1;
    },
    addPayload(state, payload) {
      payload.count = 1;
      payload.checked = true;
      state.cartList.push(payload);
    },
    selectAllClick(state, isSelectAll) {
      if (isSelectAll) {
        state.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        state.cartList.forEach(item => {
          item.checked = true;
        });
      }
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise(resolve => {
        let oldProduct = context.state.cartList.find(
          item => item.iid === payload.iid
        );

        if (oldProduct) {
          context.commit("addCount", oldProduct);
          resolve("商品数量加1");
        } else {
          context.commit("addPayload", payload);
          resolve("添加到购物车成功");
        }
      });
    }
  },
  getters: {
    cartListCount(state) {
      var sum = 0;
      for (var i = 0; i < state.cartList.length; i++) {
        sum += state.cartList[i].count;
      }
      return sum;
      //这里不能用reduce，是因为调reduce的数组不能为空，为空会报错
      // state.cartList.reduce((accumulator, currentValue) => {
      //   return accumulator.count + currentValue.count;
      // });
    },
    cartList(state) {
      return state.cartList;
    },
    cartLength(state) {
      return state.cartList.length;
    }
  },
  modules: {}
});
