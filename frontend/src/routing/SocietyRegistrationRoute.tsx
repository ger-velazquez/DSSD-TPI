import * as React from 'react';
import { Router, Route, Switch } from "react-router";
import { SocietyRegistrationRoutes } from '../interfaces/SocietyRegistrationInterfaces';

export interface Props {
  aRoute: SocietyRegistrationRoutes;
}

export interface State {}

export class SocietyRegistrationRoute extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { aRoute } = this.props;
    return (
      <>
        <Route
          path={aRoute.path}
          exact
          render={ () => < aRoute.societyRegistrationComponent {...this.props} />}
          {... this.props}
        />
      </>
    );
  }

}