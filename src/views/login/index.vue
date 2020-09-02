<template>
  <div>
    <van-nav-bar class="nav-login" title="登录" left-arrow />
    <van-form @submit="goLogin">
      <van-field
        v-model="userInfo.mobile"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        required
        :rules="[{ required: true, message: '您的手机号不正确' }]"
      />
      <van-field
        v-model="userInfo.code"
        type="password"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        required
        :rules="[{ required: true, message: '验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
// import { axiosinstance } from "@/utils/request.js";
import { login } from "@/api/user.js";
// import { profile } from "@/api/user.js";

export default {
  // 13912345678  246810
  data() {
    return {
      userInfo: {
        mobile: "13912345678",
        code: "246810"
      },
      // error hint
      errMsg: {
        mobile: "",
        code: ""
      }
    };
  },
  methods: {
    // obtain data ;
    // verify if it's empty ;
    // loading vant ;
    // call the port ;
    // success/fail
    goLogin() {
      const userInfo = this.userInfo;
      if (!userInfo.mobile) {
        this.errMsg.mobile = "mobile num can not be empty";
        return;
      } else {
        this.errMsg.mobile = "";
      }

      if (!userInfo.code) {
        this.errMsg.code = "code num can not be empty";
        return;
      } else {
        this.errMsg.code = "";
      }

      // 防止登录过程中重复点击登录 利用vant里的toast
      this.$toast({
        duration: 2000, // 持续展示 toast
        forbidClick: true,
        message: "登录验证中..."
      });

      // 1xx 服务器没有问题
      // 2xx 服务器成功 204服务器没有返回数据
      // 3xx 打开页面自动跳到别的页面去了 重定向
      // 400 前端问题. 前端参数传递错误;401 未授权,没有携带token, 405 前端接口拼写错误
      // 500+ 服务器后端问题(可甩锅)

      // axiosinstance({
      //   url: "/app/v1_0/authorizations",
      //   method: "POST",
      //   data: {
      //     mobile: userInfo.mobile,
      //     code: userInfo.code
      //   }
      // })
      // console.log(userInfo);

      login(userInfo)
        .then(res => {
          console.log(res.data.data);
          // this.$store.commit 就是执行mutations里面的函数, mutations 的功能是更新/改state的数据
          this.$store.commit("setTokenInfo", res.data.data);
          this.$toast.success({
            duration: 2000, // 持续展示 toast
            forbidClick: true,
            message: "登录成功"
          });
          this.$router.push({
            path: "/"
          });
        })
        .catch(error => {
          console.log(error);
          this.$toast.fail({
            duration: 2000, // 持续展示 toast
            forbidClick: true,
            message: "登录失败"
          });
        });
    }
  }
};
</script>
