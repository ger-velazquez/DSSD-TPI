import { cloneDeep } from "lodash";
import { CountryAndState, Partner, SocietyRegistrationWithForm } from "../interfaces/FormInterfaces";
import { SocietyRegistrationPendingFormsResponse } from "../interfaces/SocietyRegistrationInterfaces";

class FormatUtils {
  
  formatPartners(collectionsOfPartners: any[]): Partner[] {
    return collectionsOfPartners.map( (partner) => {
      return ({
        firstName: partner.name,
        lastName: partner.last_name,
        percentageOfContributions: partner.percentage,
      })
    } )
  }

  formatCountries(collectionOfCountries: any[]): CountryAndState[] {
    return collectionOfCountries.map( (countryAndState) => {
      return ({
        country: countryAndState.country.name,
        state: countryAndState.state ? countryAndState.state : ""
      })
    } )
  }
  
  formatPendingFormsResponse(response: Array<SocietyRegistrationPendingFormsResponse>): Array<SocietyRegistrationWithForm> {
    let updatedResponse: Array<SocietyRegistrationWithForm> = [];
    response.forEach((element: any) => {

      
      let newElement: SocietyRegistrationWithForm = {
        form: {
          name: element.anonymous_society.name,
          creationDate: element.anonymous_society.date_created,
          partners: this.formatPartners(element.associate),
          statuteOfConformation: element.anonymous_society.statute,
          legalDomicile: element.anonymous_society.legal_address,
          realDomicile: element.anonymous_society.real_address,
          legalRepresentative: `${element.anonymous_society.legal_representative.name} ${element.anonymous_society.legal_representative.last_name}`,
          email: element.anonymous_society.email,
          exportLocations: this.formatCountries(element.anonymous_society.export), 
        },
        societyRegistration: {
          id: element.id,
          dueDate: element.due_date,
          observation: element.observation,
          fileNumber: element.file_number,
          dateCreated: element.date_created,
          status: element.status.id,
          qr: element.qr ? element.qr : "",
          is_invalid: !!element.is_invalid
        }
      }

      updatedResponse.push(newElement);
    })

    return updatedResponse;
  }




}

export default new FormatUtils();