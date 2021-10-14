import { CorporationForm, GenericHttpResponse } from "../interfaces/FormInterfaces";
import HttpClient from "./HttpClient";

class FormService {
  async uploadAnonymousSociety(formData: CorporationForm): Promise<GenericHttpResponse<any>> {
    const formUploaded: GenericHttpResponse<any> = await HttpClient.post(
      "api/process",
      {
        form: formData
      }
    );

    return formUploaded;
  }



}

export default new FormService ();