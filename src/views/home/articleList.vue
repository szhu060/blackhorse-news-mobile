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
              <van-image lazy-load :src="img" />
            </van-grid-item>
          </van-grid>

          <!-- 文字说明 -->
          <div class="meta">
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}评论</span>
            <span>{{ item.pubdate | rTime }}</span>
            <span
              class="close"
              @click="moreAction(item)"
              v-if="$store.state.tokenInfo.token"
            >
              <van-icon name="cross"></van-icon>
            </span>
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
      loading: false,
      // 实现翻页 1.^加一个变量 记录时间
      timestamp: null
    };
  },
  methods: {
    // onLoad的执行时机：
    // 1. 页面打开，不足一屏，会自动调用
    // 2. 手动上拉
    onLoad() {
      console.log("翻页", this.loading);
      console.log("this channel", this.channel);
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

      // 2^ 判断this.timestamp是否存在 如果不存在Date.now() 如果存在我们就用this.timestamp
      let tempTime = null;
      if (this.timestamp) {
        tempTime = this.timestamp;
      } else {
        tempTime = Date.now();
      }

      this.getArticle({
        channel_id: this.channel.id,
        timestamp: tempTime
      });
    },
    async getArticle(obj) {
      // 1. 调用接口
      // 2. 调用完加载的状态 this.loading = false;
      // 3. 判断我们请求到的数据是否为空 如果是空的 this.finished = true;
      try {
        //1. 调用接口
        const res = await article(obj);
        // console.log(res, "文章调用的返回数据res");
        // console.log(res.data.data.results, "文章列表");

        //3. 判断我们请求到的数据是否为空 如果是空的
        if (res.data.data.results.length === 0) {
          this.finished = true;
          return;
        }
        this.timestamp = res.data.data.pre_timestamp;
        this.list.push(...res.data.data.results);
        // console.log(this.list, "this list 内容");
        // 2.调用完加载的状态

        this.loading = false;
        // this.finished = true;
      } catch (err) {
        console.log(err);
        this.finished = true;
      }
    },
    // 用this.$emit("事件名称"); 给父组件index.vue传递个事件
    // item这个文章的对象传递给obj参数
    moreAction(obj) {
      // console.log(obj,"item obj"); //obj.art_id 就是文章id
      // .toString() -> 由于这些数据可能是经过大数处理之后的对象 所以这里要加toString
      this.$emit("moreActionBtn", obj.art_id.toString());
    }
  }
};
</script>

<style scoped lang="less">
// .meta {
//   height: 40px;
//   line-height: 40px;
//   span {
//     margin-right: 10px;
//   }
// }
.meta {
  height: 40px;
  line-height: 40px;
  span {
    margin-right: 10px;
  }
  .close {
    // 让它在最右边
    // 它的父级容器是flex的，给当前元素设置左外边距为auto，会让这个元素在父级容器
    // 的最右边
    float: right;
    margin: 3px 5px 0 0;
  }
}
</style>
