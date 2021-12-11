import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Navigator } from '../Generic/Navigator';
import { deskStaffNavigator } from '../../interfaces/NavigatorInterface';

export interface Props { }

export interface State { }

export class DeskStaff extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

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
