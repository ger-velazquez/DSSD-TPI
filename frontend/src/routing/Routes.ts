import { SAFormV2 } from "../components/SAFormV2";
import SocietyDescription  from "../components/SocietyViews/SocietyDescription";
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

export default [
  societyRegistrationForm,
  societyRegistrationPendingForms,
  societyDescription
]