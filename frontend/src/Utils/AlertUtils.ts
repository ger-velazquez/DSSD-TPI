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
}

export default new AlertUtils();
