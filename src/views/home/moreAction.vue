<template>
  <div class="more-action">
    <van-cell-group v-if="!isReport">
      <!-- 1. 在子组件里绑定一个click 通过$emit("起个自定义事件名字") -->
      <!-- 2. 在父级组件中接受 emit传出来的自定义事件 -->
      <van-cell @click="$emit('noInterest')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport = true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport = false">返回</van-cell>
      <van-cell>侵权</van-cell>
      <van-cell>色情</van-cell>
      <van-cell>暴力</van-cell>
      <van-cell>低俗</van-cell>
      <van-cell>不适</van-cell>
      <van-cell>错误</van-cell>
      <van-cell>其他</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isReport: false
    };
  }
};
</script>

<style lang="less" scoped>
.more-action {
  border-radius: 4px;
}
</style>
