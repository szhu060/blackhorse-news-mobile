<template>
  <div class="home-page">
    <van-tabs v-model="activeIndex" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name"
        >内容 {{ item.name }}
        <ArticleList :channel="item" />
      </van-tab>
    </van-tabs>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup
      v-model="showPop"
      :style="{ width: '60%', border: '2px solid green' }"
    >
      <MoreAction />
    </van-popup>
  </div>
</template>

<script>
// 2 导入
import { myChannel } from "@/api/channel.js";
import ArticleList from "./articleList.vue";
// 导入moreAction组件到index.vue 1. 导入 2.注册 3. 使用并且驼峰<MoreAction />
import MoreAction from "./moreAction.vue";
export default {
  data() {
    return {
      activeIndex: 0,
      channels: [],
      showPop: true
    };
  },
  components: {
    ArticleList,
    MoreAction
  },
  created() {
    // 1执行函数调用
    this.getChannel();
  },
  methods: {
    async getChannel() {
      try {
        const res = await myChannel();
        console.log(res);
        // 直接赋值
        this.channels = res.data.data.channels;
      } catch (err) {
        console.log(err);
      }
    },
    showPopup() {
      this.showPop = true;
    }
  }
};
</script>

<style lang="less">
.home-page {
  .van-tabs__wrap {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .van-tabs__content {
    padding-top: 100px;
    padding-bottom: 80px;
  }
}
</style>
