export enum BonitaPaths {
  login = "loginservice"
}

export interface BonitaProcessInterface {
  activationState?: string;
  actorinitiatorid?: string;
  configurationState?: string;
  deployedBy?: string;
  deploymentDate?: string;
  description?: string;
  displayDescription?: string;
  displayName?: string;
  id: string;
  last_update_date?: string;
  name?: string;
  version?: string;
}

export interface BonitaActiveCases {
  end_date: string;
  id: string;
  last_update_date: string;
  processDefinitionId: string;
  rootCaseId: string;
  searchIndex1Label: string;
  searchIndex1Value: string;
  searchIndex2Label: string;
  searchIndex2Value: string;
  searchIndex3Label: string;
  searchIndex3Value: string;
  searchIndex4Label: string;
  searchIndex4Value: string;
  searchIndex5Label: string;
  searchIndex5Value: string;
  start: string;
  startedBySubstitute: string;
  started_by: string;

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
  currentJsessionId: string;
}

export enum BonitaGroupsPath {
  Directores = "/directores",
  Solicitantes = "/solicitantes",
  MesaDeEntrada = "/mesa-de-entrada",
  Escribanos = "/escribanos",
  Geolocalizacion = "/geolocalizacion",
}


export enum BonitaExtraPath {
  updatedForm = "/reenvio/:formId",
  managePendingForms = "/mesa-de-entrada/pending-forms"
}

export type BonitaUsersPath = { [key in BonitaOrganizationGroups]: BonitaGroupsPath }

export enum ProcessStep {
  validateForm = "Validacion de formularios de inscripcion",
  validateProcess = "Determinar validez del tramite",
  generateFolder = "Generar carpeta fisica"
}
