import { GenericHttpResponse, SocietyRegistrationWithForm } from "../interfaces/FormInterfaces";
import { ManageCollectionActions } from "../interfaces/SocietyRegistrationInterfaces";
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

  async getPendingForms(): Promise<GenericHttpResponse<SocietyRegistrationWithForm[]>> {
    const response: GenericHttpResponse<any> = await HttpClient.get(
      "endpoint"
    );

    return response;
  }

}

export default new SocietyService()