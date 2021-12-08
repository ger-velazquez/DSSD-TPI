import { BonitaExtraPath } from "./BonitaInterfaces";
import { SocietyRegistrationPaths } from "./SocietyRegistrationInterfaces";

export interface NavigatorInterface {
  path: string;
  text: string;
}

export const deskStaffNavigator: NavigatorInterface[] = [
  {
    path: BonitaExtraPath.managePendingForms,
    text: "Ver Solicitudes de Registro Pendientes de Aprobacion"
  },

  {
    path: SocietyRegistrationPaths.generateFolder,
    text: "Generar Carpetas"
  }
]