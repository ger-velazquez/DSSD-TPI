import { GenericHttpResponse, SocietyRegistrationWithForm } from "../interfaces/FormInterfaces";
import { ManageCollectionActions, SocietyRegistrationPendingFormsResponse } from "../interfaces/SocietyRegistrationInterfaces";
import FormatUtils from "../Utils/FormatUtils";
import HttpClient from "./HttpClient";

class SocietyService {

  async updatePendingForm(registrationID: number, action: ManageCollectionActions, reason: string): Promise<GenericHttpResponse<any>> {
    const response: GenericHttpResponse<any> = await HttpClient.post(
      "endpoint",
      {
        registrationID,
        action,
        reason
      }
    );

    return response;
  }

  async getPendingForms() {
    let response: SocietyRegistrationPendingFormsResponse[] = await HttpClient.get(
      "api/societies/"
    );
    let test = FormatUtils.formatPendingFormsResponse(response);
    return test;
  }

}

export default new SocietyService()