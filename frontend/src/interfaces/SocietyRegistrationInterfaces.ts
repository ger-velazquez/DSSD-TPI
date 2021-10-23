import { CorporationForm } from "./FormInterfaces";

export interface SocietyRegistrationRoutes {
  societyRegistrationComponent: any;
  path: string;
}

export enum SocietyRegistrationPaths {
  pendingForms = "/pending-forms",
  registrationForm = "/registration",
  societyDescription = "/sociedad-anonima/:fileNumber",
}

export interface ManagePendingForms {
  registrationId: number,
  formData: CorporationForm,
}

export enum ManageCollectionActions {
  accept = "accept",
  reject = "reject"
}

export interface SocietyRegistrationInterface {
  id: number;
  societyRegistrationFormId?: number;
  status: number;
  dueDate: Date;
  observation: string;
  fileNumber: string // este es el numero de expediente
  dateCreated: Date;
}

// export interface ManageCollectionInterface {
//   collectionId: number;
//   collection: Array<any>;
//   description: JSX.Element;
//   handleUpdateStatus: (id: number, operation: ManageCollectionActions) => void;
// }