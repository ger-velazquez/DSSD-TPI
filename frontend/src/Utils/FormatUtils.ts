import { SocietyRegistrationWithForm } from "../interfaces/FormInterfaces";
import { SocietyRegistrationPendingFormsResponse } from "../interfaces/SocietyRegistrationInterfaces";

class FormatUtils {
  formatPendingFormsResponse(response: Array<SocietyRegistrationPendingFormsResponse>): Array<SocietyRegistrationWithForm> {
    let updatedResponse: Array<SocietyRegistrationWithForm> = [];
    response.forEach((element: SocietyRegistrationPendingFormsResponse) => {
      const { anonymous_society} = element;

      let newElement: SocietyRegistrationWithForm = {
        form: {
          name: anonymous_society.name,
          creationDate: anonymous_society.date_created,
          partners: [],
          statuteOfConformation: anonymous_society.statute,
          legalDomicile: anonymous_society.legal_address,
          realDomicile: anonymous_society.real_address,
          legalRepresentative: `${anonymous_society.legal_representative.name} ${anonymous_society.legal_representative.last_name}`,
          email: anonymous_society.email,
          exportLocations: [], 
        },
        societyRegistration: {
          id: element.id,
          dueDate: element.due_date,
          observation: element.observation,
          fileNumber: element.file_number,
          dateCreated: element.date_created,
          status: element.status.id
        }
      }

      updatedResponse.push(newElement);
    })

    return updatedResponse;
  }




}

export default new FormatUtils();