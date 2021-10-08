import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { defaultValuesForForm } from '../constants/FormConstants';
import { CorporationForm, DynamicCollections, DynamicFieldsOperations, Partner } from '../interfaces/FormInterfaces';
import { GenericInputForm } from './Generic/GenericInputForm';
import { cloneDeep } from 'lodash';
import { PartnerFields } from './Generic/PartnerFields';
import { CountryAndStateFields } from './Generic/CountryAndStateFields';
import { GenericInputHeaderField } from './Generic/GenericInputHeaderField';


export interface Props { }

export interface State {
  validated: boolean;
  corporationForm: CorporationForm;
  collectionOfExportLocationsField: JSX.Element[];
  collectionOfPartnersField: JSX.Element[];
}

export class SAForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      validated: false,
      corporationForm: defaultValuesForForm,
      collectionOfExportLocationsField: [
        <CountryAndStateFields
          index={0}
          onChange={(event, arrayKey, objectKey, index) => this.customHandleChange(event, arrayKey, objectKey, index)}
        />
      ],
      collectionOfPartnersField: [
        <PartnerFields
          index={0}
          onChange={(event, arrayKey, objectKey, index) => this.customHandleChange(event, arrayKey, objectKey, index)}
        />
      ]
    }

    this.customHandleChange = this.customHandleChange.bind(this);
    this.addMediaContent = this.addMediaContent.bind(this);
  }

  addMediaContent(form: CorporationForm) {
    console.log("llegue");

    console.log(form);

  }

  // arrayKey could be for partner or country locations
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

  handleAdditionalFields(typeOfDynamicField: DynamicCollections, operation: DynamicFieldsOperations) {

    let currentCollection: JSX.Element[] = [... this.state[typeOfDynamicField]];
    if (operation == DynamicFieldsOperations.add) {

      const dynamicCollectionOfComponents = {
        "collectionOfPartnersField": (
          <PartnerFields
            key={currentCollection.length}
            index={currentCollection.length}
            onChange={(event: React.ChangeEvent<HTMLInputElement>, arrayKey: keyof CorporationForm, objectKey: string, index: number) => this.customHandleChange(event, arrayKey, objectKey, index)}
          />
        ),
        "collectionOfExportLocationsField": (
          <CountryAndStateFields
            key={currentCollection.length}
            index={currentCollection.length}
            onChange={(event: React.ChangeEvent<HTMLInputElement>, arrayKey: keyof CorporationForm, objectKey: string, index: number) => this.customHandleChange(event, arrayKey, objectKey, index)}
          />
        )
      }

      currentCollection.push(dynamicCollectionOfComponents[typeOfDynamicField]);

    }
    else {
      currentCollection.pop();
    }

    if (DynamicCollections.collectionOfPartnersField == typeOfDynamicField) {

      this.setState({
        collectionOfPartnersField: currentCollection,
      })
    }
    else {
      this.setState({
        collectionOfExportLocationsField: currentCollection,
      })
    }
  }



  customHandleChange(event: React.ChangeEvent<HTMLInputElement>, arrayKey: keyof CorporationForm, objectKey: string, index: number) {
    let formToBeUpdated = cloneDeep(this.state.corporationForm);
    (formToBeUpdated as any)[arrayKey][index][objectKey] = event.target.value;

    this.setState({
      corporationForm: formToBeUpdated,
    })
  }


  render() {
    const partnersLength: number = this.state.collectionOfPartnersField.length;
    const locationsLength: number = this.state.collectionOfExportLocationsField.length;

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
              <Row className="mb-3">
                <Col md="6" sm="12" >

                  <GenericInputForm
                    name="name"
                    type="text"
                    labelText="Nombre de la SA"
                  />

                </Col>

                <Col md="6" sm="12" >
                  <GenericInputForm
                    name="creationDate"
                    type="date"
                    labelText="Fecha de Creacion"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="6" sm="12" >

                  <GenericInputForm
                    name="legalDomicile"
                    type="string"
                    labelText="Domicilio Legal"
                  />

                </Col>

                <Col md="6" sm="12" >

                  <GenericInputForm
                    name="realDomicile"
                    type="string"
                    labelText="Domicilio Real"
                  />

                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="6" sm="12" >

                  <GenericInputForm
                    name="email"
                    type="text"
                    labelText="Email"
                  />

                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="6" sm="12" >

                  <div >
                    <div className="d-flex justify-content-center">
                      <GenericInputHeaderField
                        typeOfDynamicField={DynamicCollections.collectionOfExportLocationsField}
                        title="Zonas de Exportacion"
                        currentAmountOfItems={locationsLength}
                        handleAdditionalFields={(typeOfDynamicField: DynamicCollections, operation: DynamicFieldsOperations) => this.handleAdditionalFields(typeOfDynamicField, operation)}
                      />
                    </div>
                    {
                      this.state.collectionOfExportLocationsField.map((countryField: JSX.Element) => {
                        return (
                          <div className="mb-2">
                            {countryField}
                          </div>
                        )
                      })
                    }
                  </div>

                </Col>

                <Col md="6" sm="12" >

                  <div >
                    <div className="d-flex justify-content-center">
                      <GenericInputHeaderField
                        typeOfDynamicField={DynamicCollections.collectionOfPartnersField}
                        title="Socios"
                        currentAmountOfItems={partnersLength}
                        handleAdditionalFields={(typeOfDynamicField: DynamicCollections, operation: DynamicFieldsOperations) => this.handleAdditionalFields(typeOfDynamicField, operation)}
                      />
                    </div>
                    <div>
                      {
                        this.state.collectionOfPartnersField.map((countryField: JSX.Element) => {
                          return (
                            <div className="mb-2">
                              {countryField}
                            </div>
                          )
                        })
                      }
                    </div>

                  </div>


                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="6" sm="12" >

                  <GenericInputForm
                    name="statuteOfConformation"
                    type="file"
                    accept=".pdf"
                    labelText="Estatuto de conformacion"
                  />

                </Col>
              </Row>

              <Row className="mb-3 d-flex justify-content-center">
                <div>
                  <button type="submit"> Cargar </button>
                </div>
                

              </Row>

            </Form>

          </Formik>
        </Container>
      </>
    );
  }

}

// export default injectSheet(style)(component)
