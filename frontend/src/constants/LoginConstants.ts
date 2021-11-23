import { BonitaGroupsPath, BonitaUsersPath } from "../interfaces/BonitaInterfaces";
import { UserLogin } from "../interfaces/LoginInterfaces";

export const initialUserLogin: UserLogin = {
  username: "",
  password: "",
}

export const bonitaUrl: string = "app.bonita.com:80/bonita"

export const userGroupAndPathMapped: BonitaUsersPath = {
  'Directores': BonitaGroupsPath.Directores,
  'Escribanos': BonitaGroupsPath.Escribanos,
  'Geolocalizacion': BonitaGroupsPath.Geolocalizacion,
  'MesaDeEntrada': BonitaGroupsPath.MesaDeEntrada,
  'Solicitantes': BonitaGroupsPath.Solicitantes
}