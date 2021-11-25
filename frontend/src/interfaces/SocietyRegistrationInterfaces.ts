import { CorporationForm } from "./FormInterfaces";

export interface SocietyRegistrationRoutes {
  societyRegistrationComponent: any;
  path: string;
}

export enum SocietyRegistrationPaths {
  pendingForms = "/pending-forms",
  registrationForm = "/registration",
  societyDescription = "/society/:fileNumber",
  generateFileNumber = "/generate-file-number",
  login = "/login",
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
  observation: string | null;
  fileNumber: string // este es el numero de expediente
  dateCreated: Date;
}

export interface SocietyRegistrationPendingFormsResponse {
  anonymous_society: {
    name: string;
    date_created: Date;
    email: string;
    legal_address: string;
    real_address: string;
    statute: string;
    legal_representative: {
      id: number;
      name: string;
      last_name: string;
      percentage: number;
      society_registration: number;
    };
  };
  id: number;
  due_date: Date;
  observation: string | null;
  file_number: string;
  hash: string;
  date_created: Date;
  status: {
    id: number;
    name: string;
  }
}

// export interface ManageCollectionInterface {
//   collectionId: number;
//   collection: Array<any>;
//   description: JSX.Element;
//   handleUpdateStatus: (id: number, operation: ManageCollectionActions) => void;
// }