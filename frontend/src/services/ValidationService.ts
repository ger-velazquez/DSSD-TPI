import { CorporationForm, GenericValidationInterface, Partner } from "../interfaces/FormInterfaces";

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

  private sumIs100(partners: Partner[]): boolean {
    if (partners.length === 0) {
      return false;
    }
    return partners.map((partners) => partners.percentageOfContributions).reduce((prev, actual) => prev + actual) === 100;
  }

  private validatePartners(partners: Partner[]): boolean {
    const a = this.sumIs100(partners);
    console.log(a);

    return a;
  }

  validateForm(form: CorporationForm, legalRepresentative: string): string[] {
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
      {
        validationFunction: () => this.validatePartners(partners),
        errorMessage: "La suma de los porcentajes debe ser igual a 100",
      },

    ]

    return this.executeValidations(validations)
  }
}

export default new ValidationService();