import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import countryList from 'react-select-country-list';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { defaultCountries, defaultValuesForForm } from '../constants/FormConstants';
import { CorporationForm, Partner } from '../interfaces/FormInterfaces';
import { GenericFormSelectValues } from './Generic/GenericFormSelectValues';
import { GenericInputForm } from './Generic/GenericInputForm';


export interface Props { }

export interface State {
  validated: boolean;
  corporationForm: CorporationForm;
  collectionOfCountriesField: JSX.Element[];
  collectionOfPartnersField: JSX.Element[];
}

export class Test extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      validated: false,
      corporationForm: defaultValuesForForm,
      collectionOfCountriesField: [
        <GenericInputForm
          as="select"
          name="country"
          labelText="Pais de Exportacion"
          collectionOfContent={defaultCountries}
        />,
      ],
      collectionOfPartnersField: [

      ]
    }
  }

  addMediaContent(form: CorporationForm) {

  }

  componentDidMount() {

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
                    this.state.collectionOfCountriesField.map((countryField: JSX.Element) => {
                      return (
                        <div className="mb-2">
                          {countryField}
                        </div>
                      )
                    })
                  }
                </Col>

                <Col md="6" sm="12" >

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
