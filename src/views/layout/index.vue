<template>
  <div class="container">
    <!-- 顶部是搜索导航区 -->
    <van-nav-bar title="黑马头条" fixed left-arrow>
      <!-- 右侧搜索按钮 插槽写法-->
      <template #right>
        <van-button
          slot="right"
          class="search-btn"
          round
          type="info"
          size="small"
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 路由出口：二级路由 -->
    <router-view></router-view>

    <!-- nav-tabbar:导航工具条
      route: 开启路由模式
      to: 要跳转的路由地址
    -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout"
};
</script>

<style scoped lang="less">
// scoped 添加之后,不一定会对vant组件的样式有影响, 得试一试,如果不好使 可以给想改的地方加个<span>,<div>等 再修改这个样式; 或者 给组件的tag添加个class,然后再给其添加样式
</style>
