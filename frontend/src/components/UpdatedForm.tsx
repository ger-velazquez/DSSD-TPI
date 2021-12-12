import * as React from 'react';
import { SocietyRegistrationWithForm } from '../interfaces/FormInterfaces';
import BonitaService from '../services/BonitaService';
import { SAFormV2 } from './SAFormV2';

export interface Props {
  society: SocietyRegistrationWithForm;
}

export interface State {}

export class UpdatedForm extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    const userInformation = BonitaService.getUserInformationInLocalStorage();

    const bonitaToken = userInformation.bonitaToken;
    const userId = userInformation.currentUserId;
    const jsessionId = userInformation.currentJsessionId;
    const responseTest = await BonitaService.sendLoginToBackend(userId, bonitaToken, jsessionId);
  }
  
  
  render() {
    return (
      <>
        <SAFormV2
          society={this.props.society}
        />
      </>
    );
  }

}
