import { LocalStorageKeys } from "../interfaces/LocalStorageInterfaces";
import { UserLogin } from "../interfaces/LoginInterfaces";
import LocalStorageService, { CacheContent } from "./LocalStorageService";
import Cookies from "js-cookie";
import { bonitaUrl, userGroupAndPathMapped } from "../constants/LoginConstants";
import { BonitaActiveCases, BonitaOrganizationGroups, BonitaProcessInterface, BonitaSession, BonitaUserInformation } from "../interfaces/BonitaInterfaces";

class BonitaService {

  private getBonitaToken(): string {
    const bonitaToken: string = Cookies.get(LocalStorageKeys.xBonitaToken)!;
    return bonitaToken ? bonitaToken : ""
  }


  // private saveTokenInLocalStorage() {
  //   const cookiesAsArray: Array<string> = document.cookie.split(';');
  //   const bonitaToken: string = cookiesAsArray[cookiesAsArray.length - 1].split("=")[1];

  //   const tokenSaved: CacheContent<string> = {
  //     timestamp: Date.now(),
  //     content: bonitaToken,
  //   }
  //   if (LocalStorageService.getItem<CacheContent<string>>(LocalStorageKeys.xBonitaToken)) {
  //     LocalStorageService.removeItem(LocalStorageKeys.xBonitaToken);
  //   }
  //   LocalStorageService.setItem<CacheContent<string>>(LocalStorageKeys.xBonitaToken, tokenSaved);
  // }


  // public async instantiateProcess() {
  //   var myHeaders = new Headers();
  //   myHeaders.append("X-Bonita-API-Token", this.getBonitaToken());
  //   // myHeaders.append("Cookie", "bonita.tenant=1; BOS_Locale=es; JSESSIONID=A9FB18C65A00D71F63914B375ADDD997; X-Bonita-API-Token=1c80b626-1934-4800-bf92-85728565cd6f");

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };

  //   fetch(`http://${bonitaUrl}/API/bpm/process/9209062777826962689/instantiation`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }


  private getUserInformationInLocalStorage(): BonitaUserInformation {
    const response = LocalStorageService.getItem<CacheContent<BonitaUserInformation>>(LocalStorageKeys.userInformation).content
    console.log(response);

    return response;
  }

  private removeUserInformationFromLocalStorage() {
    return LocalStorageService.removeItem(LocalStorageKeys.userInformation);
  }

  private saveUserInformationInLocalStorage(bonitaToken: string, currentUserId: string, currentUserGroup: string, currentUserHomePath: string) {
    const bonitaUserInformation: BonitaUserInformation = {
      bonitaToken,
      currentUserId,
      currentUserGroup,
      currentUserHomePath
    }

    const bonitaLocalStorage: CacheContent<BonitaUserInformation> = {
      timestamp: Date.now(),
      content: bonitaUserInformation
    }

    if (LocalStorageService.getItem<CacheContent<BonitaUserInformation>>(LocalStorageKeys.userInformation)) {
      LocalStorageService.removeItem(LocalStorageKeys.userInformation);
    }
    LocalStorageService.setItem<CacheContent<BonitaUserInformation>>(LocalStorageKeys.userInformation, bonitaLocalStorage);
  }

  private async setUpLogin() {
    const bonitaToken: string = this.getBonitaToken();
    const currentUserId: string = await (await this.getCurrentSessionId()).user_id;
    const userGroup: string = (await (this.getUserInformation(currentUserId)))[0].group_id.displayName;

    const currentUserHomePath = userGroupAndPathMapped[userGroup as BonitaOrganizationGroups]
    this.saveUserInformationInLocalStorage(bonitaToken, currentUserId, userGroup, currentUserHomePath);

    const urlRedirect: string = `http://app.bonita.com:3001${this.getUserInformationInLocalStorage().currentUserHomePath}`
    window.location.replace(urlRedirect);
  }

  public async getUserInformation(userId: string): Promise<any> {
    const url: string = `http://${bonitaUrl}/API/identity/membership?p=0&c=10&f=user_id%3d${userId}&d=role_id&d=group_id`
    let myHeaders: HeadersInit = new Headers();
    myHeaders.append("X-Bonita-API-Token", this.getBonitaToken().toString());

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include'

    };

    const response = await fetch(url, requestOptions).then(data => data.json())
    console.log(response);
    return response;
  }

  public async getCurrentSessionId(): Promise<BonitaSession> {
    let myHeaders: HeadersInit = new Headers();
    myHeaders.append("X-Bonita-API-Token", this.getBonitaToken().toString());

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include'

    };

    const response: BonitaSession = await fetch(`http://${bonitaUrl}/API/system/session/unusedid`, requestOptions).then(data => data.json())
    return response;
  }

  public async logIn(userLogin: UserLogin) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "bonita.tenant=1; BOS_Locale=es");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", userLogin.username);
    urlencoded.append("password", userLogin.password);

    const requestOptions: RequestInit = {
      // mode: 'no-cors',
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
      credentials: 'include'
    };


    fetch(`http://${bonitaUrl}/loginservice`, requestOptions)
      .then(response => {
        if (!response.ok) {
          alert("Las credenciales no son validas")
          return;
        }
        else {
          this.setUpLogin();
        }
      })
    // .catch(function (error) {
    //   console.log();
    //   console.log('Hubo un problema con la petición Fetch:' + error.message);
    // });
  }

  public async logOut() {

    const myHeaders = new Headers();
    myHeaders.append("Cookie", "JSESSIONID=BB139426EE4B663352DC87F917DA59B1");

    const requestOptions: RequestInit = {
      // mode: 'no-cors',
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include'

    };

    fetch(`http://${bonitaUrl}/logoutservice`, requestOptions).then(
      (response: Response) => {
        if (response.ok) {
          this.removeUserInformationFromLocalStorage();
        }
      }
    )

  }


  public async getActiveProcess(): Promise<Array<BonitaProcessInterface>> {
    var myHeaders = new Headers();
    myHeaders.append("X-Bonita-API-Token", this.getBonitaToken());

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include'

    };

    const response: Array<BonitaProcessInterface> = await fetch(`http://${bonitaUrl}/API/bpm/process?s=Proceso%20de%20Inscripcion%20de%20SA`, requestOptions).then(data => data.json());
    console.log(response);
    return response;

  }

  public async getActiveCases(): Promise<Array<BonitaActiveCases>> {
    var myHeaders = new Headers();
    myHeaders.append("X-Bonita-API-Token",this.getBonitaToken());

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include'

    };

    const response: Array<BonitaActiveCases> = await fetch("http://app.bonita.com:80/bonita/API/bpm/case?p=0&c=100", requestOptions).then(data => data.json());
    console.log("RSTA ! ");
    console.log(response);
    
    return response;

  }

  public filterCasesId(bonitaCases: Array<BonitaActiveCases>): string[] {
    return bonitaCases.map( (bonitaCase: BonitaActiveCases) => bonitaCase.id );
  }


}

export default new BonitaService();