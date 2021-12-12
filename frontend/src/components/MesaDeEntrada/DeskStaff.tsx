import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Navigator } from '../Generic/Navigator';
import { deskStaffNavigator } from '../../interfaces/NavigatorInterface';
import BonitaService from '../../services/BonitaService';

export interface Props { }

export interface State { }

export class DeskStaff extends React.Component<Props, State> {

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
        <Container>
          <div className="d-flex justify-content-between mb-5">
            <Navigator
              collectionOfPath={deskStaffNavigator}
            />
          </div>
        </Container>
      </>
    );
  }

}
