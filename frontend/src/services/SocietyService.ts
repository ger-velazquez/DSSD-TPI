import { GenericHttpResponse, SocietyRegistrationWithForm } from "../interfaces/FormInterfaces";
import { ManageCollectionActions, SocietyRegistrationPendingFormsResponse } from "../interfaces/SocietyRegistrationInterfaces";
import FormatUtils from "../Utils/FormatUtils";
import HttpClient from "./HttpClient";

class SocietyService {

  async updatePendingForm(registrationID: number, action: ManageCollectionActions, reason: string, numberOfHoursForResend: number): Promise<GenericHttpResponse<any>> {
    const response: GenericHttpResponse<any> = await HttpClient.post(
      "endpoint",
      {
        registrationID,
        action,
        reason,
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

}

export default new SocietyService()