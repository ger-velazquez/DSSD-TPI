import { BonitaPaths } from "../interfaces/BonitaInterfaces";
import { UserLogin } from "../interfaces/LoginInterfaces";
import HttpClient from "./HttpClient";

class LoginService {
  public async login(userLogin: UserLogin) {
    const login: any = await HttpClient.post(
      BonitaPaths.login,
      {
        username: userLogin.username,
        password: userLogin.password
      },
      true
    );

    return login
  }
}

export default new LoginService();