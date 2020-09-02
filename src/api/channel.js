import { axiosinstance } from "@/utils/request.js";

export const myChannel = () => {
  return axiosinstance({
    url: "/app/v1_0/user/channels",
    method: "GET"
  });
};
