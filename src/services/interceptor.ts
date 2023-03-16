import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const interceptor = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

interceptor.interceptors.request.use((req: InternalAxiosRequestConfig<any>) => {
  const token = Cookies.get("mgt");
  if (token && req.headers) req.headers.Authorization = `Bearer ${token}`;

  return req;
});

interceptor.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    console.log(error);
    // if (error?.response!.status === 401) {
    //   Cookies.remove("mgt");
    //   window.location.assign("/login");
    // }
    return Promise.reject(error.response);
  }
);

export default interceptor;
