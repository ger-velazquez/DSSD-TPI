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

  public async backendLogin(userId: string, bonitaToken: string) {

    const response = await HttpClient.post(
      "api/login",
      {
        token: bonitaToken,
        userid: userId,
        sessionid: "1446B70A24BD4C5FF0F6E9C3EAF671D7"
      }
    );

    return response;

  }

}

export default new LoginService();