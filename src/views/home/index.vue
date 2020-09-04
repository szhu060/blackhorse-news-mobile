<template>
  <div class="home-page">
    <van-tabs v-model="activeIndex" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name"
        >内容 {{ item.name }}
        <ArticleList @moreActionBtn="moreActionBtn" :channel="item" />
      </van-tab>
    </van-tabs>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup
      v-model="showPop"
      :style="{ width: '60%', border: '2px solid green' }"
    >
      <MoreAction @noInterest="disLike" />
    </van-popup>
  </div>
</template>

<script>
// 2 导入
import { myChannel } from "@/api/channel.js";
import ArticleList from "./articleList.vue";
// 导入moreAction组件到index.vue 1. 导入 2.注册 3. 使用并且驼峰<MoreAction />
import MoreAction from "./moreAction.vue";
import { dislikeArticle } from "@/api/article.js";
export default {
  data() {
    return {
      activeIndex: 0,
      channels: [],
      showPop: false, //no-display on default
      articleIDcloseId: null //将点击关闭按钮的那篇文章的id存入这个变量
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
        // console.log(res);
        // 直接赋值
        this.channels = res.data.data.channels;
      } catch (err) {
        console.log(err);
      }
    },
    showPopup() {
      this.showPop = true;
    },
    // 将文章id传递给id参数
    moreActionBtn(id) {
      this.articleIDcloseId = id;
      //文章列表点击"x" 弹出popup id为点击那个文章的id (string)
      // console.log(id, "wenzhang id"); 123162
      // 显示弹出窗口
      this.showPop = true;
      // this.showPopup();
    },
    async disLike() {
      // console.log(this.articleIDcloseId,"id article dislike"); // 成功了
      try {
        const res = await dislikeArticle(this.articleIDcloseId);
        //console.log(res, "点击完了dislikebtn"); //成功执行
        this.$toast(
          "You don't like the article with ID" + res.data.data.target
        );
        // 直接赋值
      } catch (err) {
        console.log(err);
        this.$toast("fail");
      }
      this.showPop = false;
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
