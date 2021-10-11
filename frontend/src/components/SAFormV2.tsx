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


export interface Props { }

export interface State {
  validated: boolean;
  corporationForm: CorporationForm;
  modalConfiguration: ModalConfiguration;
}
//dv
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

  async addMediaContent(form: CorporationForm) {
    const formData: CorporationForm = cloneDeep(this.state.corporationForm);
    const response = await HttpClient.post(
      "api/process",
      {
        form: formData
      }
    )

  }

  // formKey could be for partner or country locations
  // objectKey could be any key of the form objects
  // index corresponds to the position in the respective array

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
        <PartnerFields/>
      )
      initialValues = {
        firstName: "",
        lastName: "",
        percentageOfContributions: 0,
      }
      title = "Socios"
    }
    else {
      specificForm = (
        <CountryAndStateFields/>
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
    return this.state.corporationForm.partners ? this.state.corporationForm.partners.map( (p) => `${p.firstName} ${p.lastName}` ) : []; 
  }

  render() {
    const partnersOptions: string[]= this.getPartnersOptions()
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
                  />


                  <GenericInputForm
                    name="realDomicile"
                    type="string"
                    labelText="Domicilio Real"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
                  />

                  <GenericInputForm
                    name="creationDate"
                    type="date"
                    labelText="Fecha de Creacion"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
                  />

                  <GenericInputForm
                    name="legalRepresentative"
                    as="select"
                    labelText="Representante Legal"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
                    collectionOfContent={partnersOptions}
                  />

                  <GenericInputForm
                    name="statuteOfConformation"
                    type="file"
                    accept=".pdf"
                    labelText="Estatuto de conformacion"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)} />

                </Col>

                <Col md="6" sm="12" >
                  <GenericInputForm
                    name="email"
                    type="text"
                    labelText="Email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)} />

                  <GenericInputForm
                    name="legalDomicile"
                    type="string"
                    labelText="Domicilio Legal"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)} />

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
