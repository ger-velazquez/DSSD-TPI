import Swal from "sweetalert2";
import { AlertTypes } from "../interfaces/FormInterfaces";

class AlertUtils {
  notify(operationResult: AlertTypes, title: string, description?: string) {
    Swal.fire({
      title: title,
      html: description,
      icon: operationResult,
      showConfirmButton: true,
    });
  }

  notifyWithCallback(
    operationResult: AlertTypes,
    title: string,
    callback: Function
  ) {
    Swal.fire({
      title: title,
      icon: operationResult,
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        callback();
      }
    });
  }


}

export default new AlertUtils();
