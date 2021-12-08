import { GenericHttpResponse, SocietyRegistrationWithForm } from "../interfaces/FormInterfaces";
import { ManageCollectionActions, SocietyRegistrationPendingFormsResponse } from "../interfaces/SocietyRegistrationInterfaces";
import FormatUtils from "../Utils/FormatUtils";
import HttpClient from "./HttpClient";

class SocietyService {

  //
  async updatePendingForm(registrationID: number, action: ManageCollectionActions, reason: string, numberOfHoursForResend: number): Promise<GenericHttpResponse<any>> {
    console.log("Los datos a enviar son:");
    console.log(`RegistrationId: ${registrationID}`);
    console.log(`Action: ${action}`);
    console.log(`Reason: ${reason}`);
    console.log(`Numero de Horas para el reenvio: ${numberOfHoursForResend}`); 
    
    const response: GenericHttpResponse<any> = await HttpClient.post(
      "endpoint",
      {
        id: registrationID,
        status: action,
        observation: reason,
        time: numberOfHoursForResend
      }
    );

    return response;
  }

  async getSocietyWithForm(societyId: string) {
    let response: SocietyRegistrationPendingFormsResponse[] = await HttpClient.get(
      `api/societies/?id=${societyId}`
    );

    let updatedResponse = FormatUtils.formatPendingFormsResponse([response[0]])
    return updatedResponse;
  }
  
  async getPendingForms() {
    let response: SocietyRegistrationPendingFormsResponse[] = await HttpClient.get(
      "api/societies/"
    );
    let test = FormatUtils.formatPendingFormsResponse(response);
    return test;
  }

  async getPendingFormsWithCasesId(activeCasesId: string[]) {
    const response: SocietyRegistrationPendingFormsResponse[] = await HttpClient.get(
      "api/societies"
    );

    return FormatUtils.formatPendingFormsResponse(response);
  }

  async generateFolder(id: number) {
    console.log(id);
    const response = HttpClient.post(
      "api/generate-folder",
      {
        id
      }
    );

    return response;
    
  }

}

export default new SocietyService()