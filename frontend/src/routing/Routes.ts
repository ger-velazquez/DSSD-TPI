import { ApplicantsHomepage } from "../components/Applicants/ApplicantsHomepage";
import { DirectorsHomepage } from "../components/Directors/DirectorsHomepage";
import { NotaryHomepage } from "../components/Escribanos/NotaryHomepage";
import { GeolocalizacionHomepage } from "../components/Geolocalizacion/GeolocalizationHomepage";
import { Login } from "../components/Login/Login";
import { DeskStaff } from "../components/MesaDeEntrada/DeskStaff";
import { SAFormV2 } from "../components/SAFormV2";
import SocietyDescription  from "../components/SocietyViews/SocietyDescription";
import UpdatedFormWrapper from "../components/UpdatedFormWrapper";
import { BonitaExtraPath, BonitaGroupsPath } from "../interfaces/BonitaInterfaces";
import { SocietyRegistrationPaths, SocietyRegistrationRoutes } from "../interfaces/SocietyRegistrationInterfaces";
import { SocietyRegistrationPendingForms } from "../sections/SocietyRegistrationPendingForms";

export const societyRegistrationPendingForms: SocietyRegistrationRoutes = {
  societyRegistrationComponent: SocietyRegistrationPendingForms,
  path: SocietyRegistrationPaths.pendingForms
}

export const societyRegistrationForm: SocietyRegistrationRoutes = {
  societyRegistrationComponent: SAFormV2,
  path: SocietyRegistrationPaths.registrationForm
}

export const societyDescription: SocietyRegistrationRoutes = {
  societyRegistrationComponent: SocietyDescription,
  path: SocietyRegistrationPaths.societyDescription
}

export const login: SocietyRegistrationRoutes = {
  societyRegistrationComponent: Login,
  path: SocietyRegistrationPaths.login
}

export const geolocalizacion: SocietyRegistrationRoutes = {
  societyRegistrationComponent: GeolocalizacionHomepage,
  path: BonitaGroupsPath.Geolocalizacion
}

export const directors: SocietyRegistrationRoutes = {
  societyRegistrationComponent: DirectorsHomepage,
  path: BonitaGroupsPath.Directores
}

export const notaries: SocietyRegistrationRoutes = {
  societyRegistrationComponent: NotaryHomepage,
  path: BonitaGroupsPath.Escribanos
}

export const applicants: SocietyRegistrationRoutes = {
  societyRegistrationComponent: ApplicantsHomepage,
  path: BonitaGroupsPath.Solicitantes
}

export const deskStaff: SocietyRegistrationRoutes = {
  societyRegistrationComponent: DeskStaff,
  path: BonitaGroupsPath.MesaDeEntrada
}

export const societyByFormId: SocietyRegistrationRoutes = {
  societyRegistrationComponent: UpdatedFormWrapper,
  path: BonitaExtraPath.updatedForm,
}

export default [
  societyRegistrationForm,
  societyRegistrationPendingForms,
  societyDescription,
  login,
  geolocalizacion,
  directors,
  notaries,
  applicants,
  deskStaff,
  societyByFormId
]