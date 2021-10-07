export type GenericInputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week" | "select" | "textarea"

export enum HTMLInputType {
  input = "input",
  textArea = "textarea",
  select = "select"
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

export type ArrayToBeModifiedKeys = "partners" | "exportLocations"; 

export interface CorporationForm {
  name: string;
  creationDate: Date | null;
  partners: Partner[];
  statuteOfConformation: File | null; // save the pdf route in app file system
  legalDomicile: string;
  realDomicile: string;
  legalRepresentative: Partner;
  email: string;
  exportLocations: CountryAndState[];
}
