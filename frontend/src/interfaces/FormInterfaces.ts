export type GenericInputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week" | "select" | "textarea"

export enum HTMLInputType {
  input = "input",
  textArea = "textarea",
  select = "select"
}

export enum DynamicFieldsOperations {
  add = "add",
  delete = "delete",
}

export interface ModalConfiguration {
  show: boolean;
  collectionKey: DynamicCollections;
  specificForm: JSX.Element;
  initialValues: InitialValuesToCollectionsModal;
  title: string;
  validations?: Array<Function>;
}

export enum DynamicCollections {
  exportLocations = "exportLocations",
  partners = "partners"
}

export interface Partner {
  firstName: string;
  lastName: string;
  percentageOfContributions: number;
}

export interface CountryAndState {
  country: string;
  state: string;
}

export type InitialValuesToCollectionsModal = Partner | CountryAndState;

export type OnSubmitToTheCollection = (values: InitialValuesToCollectionsModal, collectionType: DynamicCollections) => void;

export type ArrayToBeModifiedKeys = "partners" | "exportLocations"; 

export interface CorporationForm {
  name: string;
  creationDate: Date | null;
  partners: Array<Partner>;
  statuteOfConformation: File | null; // save the pdf route in app file system
  legalDomicile: string;
  realDomicile: string;
  legalRepresentative: Partner;
  email: string;
  exportLocations: CountryAndState[];
}
