import * as React from 'react';
import { SocietyRegistrationWithForm } from '../../interfaces/FormInterfaces';
import { ManageCollectionActions } from '../../interfaces/SocietyRegistrationInterfaces';
import { GenericModal } from '../Generic/GenericModal';
import { ManageCollectionOfItems } from '../Generic/ManageCollectionOfItems';

export interface Props { }

export interface State {
  pendingForms: Array<SocietyRegistrationWithForm>;
  showRejectionModal: boolean;
}

export class DeskStaff extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      pendingForms: [],
      showRejectionModal: false,
    }
  }

  handleReject() {

  }

  handleAccept() {

  }

  render() {
    return (
      <>
        {/* <ManageCollectionOfItems
          collection={this.state.pendingForms}
          showDataInModal={(societyRegistrationData: SocietyRegistrationWithForm) => this.showModal(societyRegistrationData)}
          handleUpdate={(id: number, operation: ManageCollectionActions) => this.handleUpdate(id, operation)}
        /> */}
        <GenericModal
          show={this.state.showRejectionModal}
          title="Rejection"
          onClose={() => this.setState({ showRejectionModal: false })}
        >
          <div>

          </div>
        </GenericModal>
      </>
    );
  }

}
