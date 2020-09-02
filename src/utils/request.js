import axios from "axios";
export const axiosinstance = axios.create({
  baseURL: "http://ttapi.research.itcast.cn"
});

/**
 * 在请求发出去之前 拦截 看看加没加上token 关于token的获取
 * 1.引入store
 */
import store from "@/store/index.js";
// 获得token !!别忘了返回
console.log(store.state.tokenInfo.token);

axiosinstance.interceptors.request.use(
  function(config) {
    console.log(config); //config 是发送请求所有携带信息的对象
    if (store.state.tokenInfo.token) {
      config.headers.Authorization = `Bearer ${store.state.tokenInfo.token}`; // 相当于 先引入 {getItem} 在调入getItem("")
    }
    return config;
  },
  function(err) {
    console.log(err);
    // Promise 有resolve/reject 是es6的语法 不用引入 可以随时使用
    return Promise.reject(err);
  }
);
