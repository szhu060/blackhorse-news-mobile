<template>
  <div>
    <!-- 文章列表 -->
    <!-- 上拉翻页 list-->
    <!--  下拉刷新 -->
    <!--
      1. van-list自带上拉加载更加多的效果
      2. 原理
         1） 数据项在list中。
         2） 在显示数据时，如果当前的数据内容不够一屏，它会自动调用onLoad去加载数据。
            在onLoad中，通过ajax取回数据
               - 添加到list
               - 把loading手动的设置为false
               - 如果所有的数据全部加载完成，则把 finished 设为true
         3) 如果手动向上拉，则也会去调用onLoad
    -->
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <!-- 数据结构
      [{
        title:"文章标题",
        cover：{
          images：["img"]
        }
      }]
     -->
      <van-cell v-for="(item, idx) in list" :key="idx" :title="item.title">
        <!-- van-cell有一个名为label的插槽，用来设置标题正下方的内容 -->
        <div slot="label">
          <!-- 图文.... -->
          <!-- 图片 van-grid
            当前文章有几张图，就用几个宫格
          -->
          <van-grid :column-num="item.cover.images.length">
            <van-grid-item v-for="(img, idx) in item.cover.images" :key="idx">
              <van-image :src="img" />
            </van-grid-item>
          </van-grid>

          <!-- 文字说明 -->
          <div class="meta">
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}评论</span>
            <span>{{ item.pubdate }}</span>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { article } from "@/api/article.js";
export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object
    }
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false
    };
  },
  methods: {
    // onLoad的执行时机：
    // 1. 页面打开，不足一屏，会自动调用
    // 2. 手动上拉
    onLoad() {
      console.log("翻页", this.loading);
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;
      //   setTimeout(()=>{console.log("翻页结束",this.loading)},0)
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
      /**
       * 调用
       */
      this.getArticle({
        channel_id: this.channel.id,
        timestamp: Date.now()
      });
    },
    async getArticle(obj) {
      // 1. 调用接口
      // 2. 调用完加载的状态 this.loading = false;
      // 3. 判断我们请求到的数据是否为空 如果是空的 this.finished = true;
      try {
        //1. 调用接口
        const res = await article(obj);
        console.log(res.data.data, "文章列表");
        this.list.push(...res.data.data.results);
        // 2.调用完加载的状态
        this.loading = false;
        // this.finished = true;
        //3. 判断我们请求到的数据是否为空 如果是空的
        if (res.data.data.results.length === 0) {
          this.finished = true;
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        this.finished = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
.meta {
  span {
    margin-right: 10px;
  }
}
</style>
