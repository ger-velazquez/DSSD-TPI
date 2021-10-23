import { SAFormV2 } from "../components/SAFormV2";
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

export default [
  societyRegistrationForm,
  societyRegistrationPendingForms
]