import { Form, Formik } from 'formik';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { initialUserLogin } from '../../constants/LoginConstants';
import { UserLogin } from '../../interfaces/LoginInterfaces';
import { GenericInputForm } from '../Generic/GenericInputForm';

export interface Props { }

export interface State {
  userLogin: UserLogin;
}

export class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      userLogin: initialUserLogin
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>, formKey: string) {
    let userRegistrationToBeUpdated = cloneDeep(this.state.userLogin);
    (userRegistrationToBeUpdated as any)[formKey] = event.target.value;
    this.setState({
      userLogin: userRegistrationToBeUpdated,
    })
  }

  handleSubmit(userLogin: UserLogin) {
    console.log(userLogin);
    
  }

  render() {
    return (
      <Container>
        <h1 className="mb-5">
          Log in
        </h1>
        <Formik
          initialValues={initialUserLogin}
          onSubmit={(userLogin => this.handleSubmit(userLogin))}
        >
          <Form>
            <Row>
              <Col md='12' xs='12' >
                <GenericInputForm
                  name="username"
                  type="text"
                  labelText="Nombre de Usuario"
                  onKeyUp={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.handleChange(event, formKey)}
                />

                <GenericInputForm
                  name="password"
                  type="password"
                  labelText="Contraseña"
                  onKeyUp={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.handleChange(event, formKey)}
                />
              </Col>
            </Row>


            <Row className="mb-3 d-flex justify-content-center">
              <div>
                <button type="submit"> Ingresar </button>
              </div>
            </Row>

          </Form>
        </Formik>
      </Container>
    );
  }

}
