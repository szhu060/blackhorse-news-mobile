import { axiosinstance } from "@/utils/request.js";

export const article = obj => {
  return axiosinstance({
    method: "GET",
    url: "/app/v1_1/articles",
    params: {
      channel_id: obj.channel_id,
      timestamp: obj.timestamp,
      with_top: 1
    }
  });
};
