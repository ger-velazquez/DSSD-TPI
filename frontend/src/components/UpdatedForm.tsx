import * as React from 'react';
import { SocietyRegistrationWithForm } from '../interfaces/FormInterfaces';
import { SAFormV2 } from './SAFormV2';

export interface Props {
  society: SocietyRegistrationWithForm;
}

export interface State {}

export class UpdatedForm extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <SAFormV2
          society={this.props.society}
        />
        <div>
          ACA ESTA EL FORM UPDATEADO
        </div>
      </>
    );
  }

}
