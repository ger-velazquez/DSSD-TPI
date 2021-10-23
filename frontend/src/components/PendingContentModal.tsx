import * as React from 'react';
import { CorporationForm, SocietyRegistrationWithForm } from '../interfaces/FormInterfaces';
import { GenericModal } from './Generic/GenericModal';

export interface Props {
  societyRegistrationData: SocietyRegistrationWithForm;
  show: boolean;
  onClose: () => void;
}

export interface State {}

export class PendingContentModal extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <GenericModal
          show={this.props.show}
          title="Content"
          onClose={() => this.props.onClose()}
        />
      </>
    );
  }

}
