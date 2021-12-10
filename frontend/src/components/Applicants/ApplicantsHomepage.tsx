import * as React from 'react';
import BonitaService from '../../services/BonitaService';
import LoginService from '../../services/LoginService';
import { SAFormV2 } from '../SAFormV2';

export interface Props { }

export interface State { }

export class ApplicantsHomepage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    const userInformation = BonitaService.getUserInformationInLocalStorage();
    const bonitaToken = userInformation.bonitaToken;
    const userId = userInformation.currentUserId;
    const jsessionId = userInformation.currentJsessionId;
    const response = await BonitaService.sendLoginToBackend(userId, bonitaToken, jsessionId);
  }


  render() {
    return (
      <>
        <SAFormV2 />
      </>
    );
  }

}
