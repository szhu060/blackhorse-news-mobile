import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Layout from "@/views/layout";
import Video from "@/views/video";
// import User from "@/views/user";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/home")
      },
      {
        path: "/question",
        name: "Question",
        component: () => import("@/views/question")
      },
      {
        path: "/video",
        name: "Video",
        component: Video
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
