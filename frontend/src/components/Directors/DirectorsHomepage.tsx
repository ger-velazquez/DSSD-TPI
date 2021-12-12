import * as React from 'react';
import { Container } from 'react-bootstrap';
import { AppTitle } from '../Generic/AppTitle';

export interface Props {}

export interface State {}

export class DirectorsHomepage extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Container>
          <AppTitle
            title="Panel de Monitoreo"
          />
          <div>
            
          </div>
        </Container>
      </>
    );
  }

}
