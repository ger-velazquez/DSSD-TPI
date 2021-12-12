import { CorporationForm, GenericHttpResponse } from "../interfaces/FormInterfaces";
import HttpClient from "./HttpClient";

class FormService {
  async uploadAnonymousSociety(formData: CorporationForm, id?: string): Promise<GenericHttpResponse<any>> {

    if (!!id) {
      let formUploaded: GenericHttpResponse<any> = await HttpClient.post(
        `api/process?id=${id}`,
        {
          form: formData
        }
      );

      return formUploaded;

    }

    else {
      let formUploaded: GenericHttpResponse<any> = await HttpClient.post(
        "api/process",
        {
          form: formData
        }
      );
      return formUploaded;

    }

  }



}

export default new FormService();