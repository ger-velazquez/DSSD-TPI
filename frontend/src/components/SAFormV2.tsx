import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { defaultValuesForForm } from '../constants/FormConstants';
import { CorporationForm, CountryAndState, DynamicCollections, DynamicFieldsOperations, InitialValuesToCollectionsModal, ModalConfiguration, Partner } from '../interfaces/FormInterfaces';
import { GenericInputForm } from './Generic/GenericInputForm';
import { cloneDeep } from 'lodash';
import { PartnerFields } from './Generic/PartnerFields';
import { CountryAndStateFields } from './Generic/CountryAndStateFields';
import { GenericInputHeaderField } from './Generic/GenericInputHeaderField';
import HttpClient from '../services/HttpClient';
import { AddElementToCollectionModal } from './AddElementToCollectionModal';
import GeneralUtils from '../Utils/GeneralUtils';
import { GenericInputFormWithOnChange } from './Generic/GenericInputFormWithOnChange';
import FileUtils from '../Utils/FileUtils';
import { GenericFormSelectValues } from './Generic/GenericFormSelectValues';


export interface Props { }

export interface State {
  validated: boolean;
  corporationForm: CorporationForm;
  modalConfiguration: ModalConfiguration;
}
export class SAFormV2 extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      validated: false,
      corporationForm: defaultValuesForForm,
      modalConfiguration: {
        show: false,
        title: "",
        collectionKey: DynamicCollections.exportLocations,
        specificForm: (<> </>),
        initialValues: {
          country: "",
          state: "",
        }
      }
    }

    this.customHandleChange = this.customHandleChange.bind(this);
    this.addMediaContent = this.addMediaContent.bind(this);
    this.deleteElementInCollection = this.deleteElementInCollection.bind(this);
  }

  setLegalRepresentative(partners: Partner[], legalRepresentative: string): Partner[] {
    let updatedPartners = cloneDeep(partners);
    updatedPartners.forEach((partner: Partner) => {
      let partnerName: string = `${partner.firstName} ${partner.lastName}`
      if (partnerName === legalRepresentative) {
        partner.isLegalRepresentative = true;
      }
    })

    return updatedPartners;
  }

  async addMediaContent(form: CorporationForm) {
    const formData: CorporationForm = cloneDeep(this.state.corporationForm);
    formData.partners = this.setLegalRepresentative(formData.partners, form.legalRepresentative);
    console.log(formData);

    const response = await HttpClient.post(
      "api/process",
      {
        form: formData
      }
    )

  }

  handleValidations(values: CorporationForm) {
    let objectOfErrors = {};
    const mandatoryFields: Array<string> = ["name", "creationDate", "statuteOfConformation", "legalDomicile", "realDomicile", "legalRepresentative", "email"];
    mandatoryFields.forEach((field: string) => {
      if (!(values as any)[field]) {
        (objectOfErrors as any)[field] = "Required"
      }
    })

    return objectOfErrors
  }

  deleteElementInCollection(collectionKey: DynamicCollections, index: number) {
    let currentForm: CorporationForm = cloneDeep(this.state.corporationForm);
    const result = GeneralUtils.deleteElementInCollectionByIndex<InitialValuesToCollectionsModal>((currentForm as any)[collectionKey], index);
    (currentForm as any)[collectionKey] = result;
    this.setState({
      corporationForm: currentForm
    })
  }

  handleAdditionalFields(values: InitialValuesToCollectionsModal, collectionType: DynamicCollections) { // TODO: Refactor this 
    let currentForm = cloneDeep(this.state.corporationForm);
    ((currentForm as any)[collectionType] as Array<any>).push(values)
    this.setState({ corporationForm: currentForm })
  }

  cleanModal() {
    this.setState({
      modalConfiguration: {
        show: false,
        title: "",
        collectionKey: DynamicCollections.exportLocations,
        specificForm: (<> </>),
        initialValues: {
          country: "",
          state: "",
        }
      }
    })
  }

  async handleFile(event: React.ChangeEvent<HTMLInputElement>, formKey: string) {
    console.log(event.target.files![0]);
    const toBase64 = (file: File): Promise<string | ArrayBuffer> => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as any));
      reader.onerror = error => reject(error);
    });
    const file: string | ArrayBuffer = await (toBase64 as any)(event.target.files![0]);
    let updatedForm: CorporationForm = cloneDeep(this.state.corporationForm);
    updatedForm.statuteOfConformation = file;
    this.setState({
      corporationForm: updatedForm,
    })
  }

  customHandleChange(event: React.ChangeEvent<HTMLInputElement>, formKey: string) {
    let formToBeUpdated = cloneDeep(this.state.corporationForm);
    (formToBeUpdated as any)[formKey] = event.target.value;
    this.setState({
      corporationForm: formToBeUpdated,
    })
  }

  handleModal(collectionKey: DynamicCollections) {
    let modalConfiguration = { ... this.state.modalConfiguration };
    let specificForm: JSX.Element = (<> </>);
    let initialValues: InitialValuesToCollectionsModal;
    let title: string;

    if (collectionKey == DynamicCollections.partners) {
      specificForm = (
        <PartnerFields />
      )
      initialValues = {
        firstName: "",
        lastName: "",
        percentageOfContributions: 0,
        isLegalRepresentative: false,
      }
      title = "Socios"
    }
    else {
      specificForm = (
        <CountryAndStateFields />
      )
      initialValues = {
        country: "",
        state: "",
      }

      title = "Zonas de Exportacion"
    }
    modalConfiguration.collectionKey = collectionKey;
    modalConfiguration.show = true;
    modalConfiguration.specificForm = specificForm;
    modalConfiguration.initialValues = initialValues;
    modalConfiguration.title = title;

    this.setState({
      modalConfiguration
    })
  }

  getPartnersOptions(): string[] {
    return this.state.corporationForm.partners ? this.state.corporationForm.partners.map((p) => `${p.firstName} ${p.lastName}`) : [];
  }

  render() {
    const partnersOptions: string[] = this.getPartnersOptions()
    return (
      <>
        <Container className="mt-4">
          <h1>
            Formulario de Inscripcion para una Sociedad Anonima
          </h1>
          <Formik
            initialValues={defaultValuesForForm}
            onSubmit={(form) => this.addMediaContent(form)}
          // validate={(values) => this.handleValidations(values)}
          >
            <Form>
              <Row>
                <Col md="6" sm="12" >
                  <GenericInputForm
                    name="name"
                    type="text"
                    labelText="Nombre de la SA"
                    onKeyUp={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
                  />


                  <GenericInputForm
                    name="realDomicile"
                    type="string"
                    labelText="Domicilio Real"
                    onKeyUp={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
                  />

                  <GenericInputFormWithOnChange
                    name="creationDate"
                    type="date"
                    labelText="Fecha de Creacion"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
                  />

                  <div>
                    <div>
                      <label htmlFor="legalRepresentative"> Representante Legal </label>
                    </div>
                    <Field
                      as='select'
                      name='legalRepresentative'
                    >
                      {
                        <GenericFormSelectValues
                          collectionOfContent={partnersOptions}
                        />
                      }

                    </Field>
                  </div>

                  <GenericInputFormWithOnChange
                    name="statuteOfConformation"
                    type="file"
                    accept=".pdf"
                    labelText="Estatuto de conformacion"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.handleFile(event, formKey)} />

                </Col>

                <Col md="6" sm="12" >
                  <GenericInputForm
                    name="email"
                    type="text"
                    labelText="Email"
                    onKeyUp={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)} />

                  <GenericInputForm
                    name="legalDomicile"
                    type="string"
                    labelText="Domicilio Legal"
                    onKeyUp={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)} />

                  <div >
                    <div className="d-flex justify-content-center">
                      <GenericInputHeaderField
                        title="Socios"
                        collectionType={DynamicCollections.partners}
                        onClick={(collectionKey: DynamicCollections) => this.handleModal(collectionKey)}
                      />
                    </div>
                  </div>


                  <div >
                    <div className="d-flex justify-content-center">
                      <GenericInputHeaderField
                        title="Zonas de Exportacion"
                        collectionType={DynamicCollections.exportLocations}
                        onClick={(collectionKey: DynamicCollections) => this.handleModal(collectionKey)}
                      />
                    </div>
                  </div>

                </Col>
              </Row>


              <Row className="mb-3 d-flex justify-content-center">
                <div>
                  <button type="submit"> Cargar </button>
                </div>
              </Row>

            </Form>

          </Formik>
          <AddElementToCollectionModal
            show={this.state.modalConfiguration.show}
            onClose={() => this.cleanModal()}
            title={this.state.modalConfiguration.title}
            collectionType={this.state.modalConfiguration.collectionKey}
            onSubmit={(values: InitialValuesToCollectionsModal, collectionType: DynamicCollections) => this.handleAdditionalFields(values, collectionType)}
            onDelete={(collectionKey: DynamicCollections, index: number) => this.deleteElementInCollection(collectionKey, index)}
            currentCollection={(this.state.corporationForm as any)[this.state.modalConfiguration.collectionKey]}
            initialValues={this.state.modalConfiguration.initialValues}
            specificForm={this.state.modalConfiguration.specificForm}
          />
        </Container>
      </>
    );
  }

}

// export default injectSheet(style)(component)
