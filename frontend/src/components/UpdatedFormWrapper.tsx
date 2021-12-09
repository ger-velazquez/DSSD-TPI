import * as React from 'react';
import { Container } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import { mockedPendingForms, societyWithFormInitializer } from '../constants/FormConstants';
import { SocietyRegistrationWithForm } from '../interfaces/FormInterfaces';
import SocietyService from '../services/SocietyService';
import { UpdatedForm } from './UpdatedForm';

type PathParamsType = {
  formId: string,
}

type PropsType = RouteComponentProps<PathParamsType> & {
  someString: string,
}

export interface Props { }

export interface State {
  society: SocietyRegistrationWithForm;
}

class UpdatedFormWrapper extends React.Component<PropsType, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      society: societyWithFormInitializer
    }
  }

  async componentDidMount() {    
    const formId = this.props.match.params.formId;
    const society = (await SocietyService.getSocietyWithForm(formId))[0];
    this.setState({ society })
  }
  

  render() {
    if (this.state.society == societyWithFormInitializer) {
      return (<><div>
        Son iguales pa
        </div> </>);
    }

    if (this.state.society.societyRegistration.is_invalid) {
      return (
        <Container>
          <div>
            <h1>
              Se ha vencido el plazo para que complete este formulario
            </h1>
          </div>
        </Container>
      )
    }
    return (
      <>
        <UpdatedForm
          society={this.state.society}
        />
      </>
    );
  }

}

export default withRouter(UpdatedFormWrapper);
