// user ports here
// import envoloped axios
// create a function and return
// export
// * axiosinstance 是按需导出 所以这里要按需导入
import { axiosinstance } from "@/utils/request.js";

// const login = (obj) =>{
//     return axiosinstance({
//         url:"",
//         methods:"",
//     })
// }
export const login = obj => {
  // de-construct
  const { mobile, code } = obj;
  return axiosinstance({
    url: "/app/v1_0/authorizations",
    method: "POST",
    data: { mobile, code }
  });
};

export const profile = () => {
  return axiosinstance({
    url: "/app/v1_0/user/profile",
    method: "GET",
    headers: {
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE1MTg5OTgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlfQ.RoFWFm-44JktS0vuz4If2Q-OZeeFVERDdK8c6nCAUJs"
    }
  });
};
