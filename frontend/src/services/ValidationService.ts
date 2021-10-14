import { CorporationForm, GenericValidationInterface } from "../interfaces/FormInterfaces";

class ValidationService {


  private executeValidations(validations: GenericValidationInterface[]): string[] {
    const validationError = (validation: GenericValidationInterface) => validation.errorMessage;

    const failedValidations: GenericValidationInterface[] = validations.filter((validation: GenericValidationInterface) => !validation.validationFunction())
    const validationsErrors: string[] = failedValidations.map(validationError);

    return validationsErrors
  }

  private isNotEmpty(value: string | Array<any>): boolean {
    return value.length != 0;
  }


  private isNotNull(content: any) {
    return content ? true : false;
  }

  validateForm(form: CorporationForm, legalRepresentative: string): string[]{
    const { name, creationDate, partners, statuteOfConformation, legalDomicile, realDomicile, email, exportLocations } = form;
    const validations: GenericValidationInterface[] = [
      {
        validationFunction: () => this.isNotEmpty(name),
        errorMessage: "El campo 'Nombre' no puede estar vacio ",
      },
      {
        validationFunction: () => creationDate !== null,
        errorMessage: "El campo 'Fecha de Creacion' no puede estar vacio ",
      },
      {
        validationFunction: () => this.isNotEmpty(partners),
        errorMessage: "Debe agregar a los socios de la sociedad ",
      },
      {
        validationFunction: () => statuteOfConformation !== null,
        errorMessage: "Debe cargar el estatuto de conformacion",
      },
      {
        validationFunction: () => this.isNotEmpty(legalDomicile),
        errorMessage: "El campo 'Domicilio Legal' no puede estar vacio ",
      },
      {
        validationFunction: () => this.isNotEmpty(realDomicile),
        errorMessage: "El campo 'Domicilio Real' no puede estar vacio ",
      },
      {
        validationFunction: () => this.isNotEmpty(legalRepresentative),
        errorMessage: "Seleccione un Representante Legal, por favor ",
      },
      {
        validationFunction: () => this.isNotEmpty(email),
        errorMessage: "El campo 'email' no puede estar vacio ",
      },


    ]

    return this.executeValidations(validations)
  }
}

export default new ValidationService();