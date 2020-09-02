<template>
  <div class="home-page">
    <van-tabs v-model="activeIndex" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name"
        >内容 {{ item.name }}
        <ArticleList :channel="item" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 2 导入
import { myChannel } from "@/api/channel.js";
import ArticleList from "./articleList.vue";
export default {
  data() {
    return {
      activeIndex: 0,
      channels: []
    };
  },
  components: {
    ArticleList
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
}
</style>
