import countryList from "react-select-country-list"
import { CorporationForm, Partner } from "../interfaces/FormInterfaces"

export let defaultPartner: Partner = {
    firstName: "",
    lastName: "",
    percentageOfContributions: 0,
  }
  
  export let defaultValuesForForm: CorporationForm = {
    name: "",
    creationDate: null,
    partners: [],
    statuteOfConformation: "", // save the pdf route in app file system
    legalDomicile: "",
    realDomicile: "",
    legalRepresentative: defaultPartner,
    email: "",
    country: "",
    state: "",
  }

  export const defaultCountries: Array<string> = countryList().getLabels();