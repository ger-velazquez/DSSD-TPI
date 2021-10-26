import countryList from "react-select-country-list"
import { CorporationForm, Partner, SocietyRegistrationWithForm } from "../interfaces/FormInterfaces"
import { ManagePendingForms, SocietyRegistrationInterface } from "../interfaces/SocietyRegistrationInterfaces"

export let defaultPartner: Partner = {
  firstName: "",
  lastName: "",
  percentageOfContributions: 0,
}

export let defaultValuesForSocietyRegistration: SocietyRegistrationInterface = {
  id: -1,
  societyRegistrationFormId: -1,
  status: -1,
  dueDate: new Date,
  observation: "",
  fileNumber: "",
  dateCreated: new Date,
}

export let defaultValuesForForm: CorporationForm = {
  name: "",
  creationDate: null,
  partners: [],
  statuteOfConformation: null, // save the pdf route in app file system
  legalDomicile: "",
  realDomicile: "",
  legalRepresentative: "",
  email: "",
  exportLocations: [],
}

export let mockedPendingForms: SocietyRegistrationWithForm[] = [
  {
    societyRegistration: {
      id: 1,
      societyRegistrationFormId: 2,
      status: 1,
      dueDate: new Date,
      observation: "",
      fileNumber: "asdasdasdasd",
      dateCreated: new Date,
    },
    form: {
      creationDate: new Date,
      email: "pepsi@gmail.com",
      legalDomicile: "LegalDom",
      legalRepresentative: "",
      name: "Pepsi SA",
      exportLocations: [
        {
          country: "Angola",
          state: "Estado de Angola"
        }
      ],
      partners: [
        {
          firstName: "Juan",
          lastName: "Perez",
          percentageOfContributions: 50,
          isLegalRepresentative: true,
        },
        {
          firstName: "Pepe",
          lastName: "PussyDestroyer22",
          percentageOfContributions: 50,
          isLegalRepresentative: false,
        }
      ],
      realDomicile: "Dom real",
      statuteOfConformation: "a/pdf/path"
    }
  }
]


export const defaultCountries: Array<string> = countryList().getLabels().filter( (country: string) => country !== 'Argentina' );