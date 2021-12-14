import { ProcessStep } from "../interfaces/BonitaInterfaces";
import { GenericHttpResponse, SocietyRegistrationWithForm } from "../interfaces/FormInterfaces";
import { ManageCollectionActions, SocietyRegistrationPendingFormsResponse, SocietySearchConditions } from "../interfaces/SocietyRegistrationInterfaces";
import FormatUtils from "../Utils/FormatUtils";
import HttpClient from "./HttpClient";

class SocietyService {

  //
  async updatePendingForm(registrationID: number, action: ManageCollectionActions, reason: string, numberOfHoursForResend: number): Promise<GenericHttpResponse<any>> {

    const response: GenericHttpResponse<any> = await HttpClient.post(
      "api/validate-reg-form",
      {
        id: registrationID,
        status: action,
        observation: reason,
        time: numberOfHoursForResend
      }
    );

    return response;
  }

  async updatePendingProcess(registrationID: number, action: ManageCollectionActions, observation: string): Promise<GenericHttpResponse<any>> {
    console.log("Los datos a enviar son:");
    console.log(`RegistrationId: ${registrationID}`);
    console.log(`Action: ${action}`);
    console.log(`Observaciones: ${observation}`);


    const response: GenericHttpResponse<any> = await HttpClient.post(
      "api/validate-tramite",
      {
        id: registrationID,
        status: action,
        observation
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

  async getPendingForms(collectionOfCasesId: string, step: ProcessStep) {
    let response: SocietyRegistrationPendingFormsResponse[] = await HttpClient.get(
      `api/societies/?task=${step}&caseid=${collectionOfCasesId}`
    );
    let test = FormatUtils.formatPendingFormsResponse(response);

 
    return test;
  }

  async getPendingProcess(collectionOfCasesId: string, step: ProcessStep) {
    let response: SocietyRegistrationPendingFormsResponse[] = await HttpClient.get(
      `api/validate-tramite/?task=${step}&caseid=${collectionOfCasesId}`
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

  async getSocietyByCondition(searchedValue: string, condition: SocietySearchConditions) {
    let response: SocietyRegistrationPendingFormsResponse[] = await HttpClient.get(
      `api/societies/?${condition}=${searchedValue}`
    );

    let updatedResponse = FormatUtils.formatPendingFormsResponse([response[0]])
    return updatedResponse[0];

  }
}

export default new SocietyService()