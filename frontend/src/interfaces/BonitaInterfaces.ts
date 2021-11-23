export enum BonitaPaths {
  login = "loginservice"
}

export interface BonitaSession {
  branding_version: string;
  conf: string;
  copyright: string;
  is_guest_user: string;
  session_id: string;
  user_id: string;
  user_name: string;
  version: string;
}

export enum BonitaOrganizationGroups {
  director = "Directores",
  solicitante = "Solicitantes",
  mesaDeEntrada = "MesaDeEntrada",
  escribano = "Escribanos",
  geolocalizacion = "Geolocalizacion",
}

export interface BonitaUserInformation {
  bonitaToken: string;
  currentUserId: string;
  currentUserGroup: string | BonitaOrganizationGroups;
  currentUserHomePath: string | BonitaGroupsPath;
}

export enum BonitaGroupsPath {
  Directores = "/directores",
  Solicitantes = "/solicitantes",
  MesaDeEntrada = "/mesa-de-entrada",
  Escribanos = "/escribanos",
  Geolocalizacion = "/geolocalizacion",
}
export type BonitaUsersPath = { [key in BonitaOrganizationGroups]: BonitaGroupsPath }
