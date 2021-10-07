import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { defaultValuesForForm } from '../constants/FormConstants';
import { CorporationForm, Partner } from '../interfaces/FormInterfaces';
import { GenericInputForm } from './Generic/GenericInputForm';
import { cloneDeep } from 'lodash';
import { PartnerFields } from './Generic/PartnerFields';
import { CountryAndStateFields } from './Generic/CountryAndStateFields';


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
  }

  addMediaContent(form: CorporationForm) {

  }

  componentDidMount() {

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

  customHandleChange(event: React.ChangeEvent<HTMLInputElement>, arrayKey: keyof CorporationForm, objectKey: string, index: number) {
    let formToBeUpdated = cloneDeep(this.state.corporationForm);
    (formToBeUpdated as any)[arrayKey][index][objectKey] = event.target.value;

    this.setState({
      corporationForm: formToBeUpdated,
    })
  }


  render() {


    return (
      <>
        <Container className="mt-4">
          <h1>
            Formulario de Inscripcion para una Sociedad Anonima
          </h1>
          <Formik
            initialValues={defaultValuesForForm}
            onSubmit={(form) => this.addMediaContent(form)}
            validate={(values) => this.handleValidations(values)}
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

                  {
                    this.state.collectionOfExportLocationsField.map((countryField: JSX.Element) => {
                      return (
                        <div className="mb-2">
                          {countryField}
                        </div>
                      )
                    })
                  }
                </Col>

                <Col md="6" sm="12" >

                  <div className="d-flex flex-row justify-content-center" style={{ fontSize: '1.25em', fontWeight: 800 }}>
                    <div>
                      Socios
                    </div>
                    <div>

                    </div>

                  </div>

                  {
                    this.state.collectionOfPartnersField.map((countryField: JSX.Element) => {
                      return (
                        <div className="mb-2">
                          {countryField}
                        </div>
                      )
                    })
                  }
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
