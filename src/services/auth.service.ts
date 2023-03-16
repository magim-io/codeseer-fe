import { AxiosResponse } from "axios";

import interceptor from "./interceptor";

class AuthService {
  static async login(): Promise<AxiosResponse> {
    const res = await interceptor.get(
      "https://github.com/login/oauth/authorize?client_id=6fceac8e04ce38d752ed&scope=user:email"
    );

    return res;
  }
}
export default AuthService;
