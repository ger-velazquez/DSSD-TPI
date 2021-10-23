import * as React from 'react';
import { Container } from 'react-bootstrap';
import { ManageCollectionOfItems } from '../components/Generic/ManageCollectionOfItems';
import { PendingContentModal } from '../components/PendingContentModal';
import { defaultValuesForForm, defaultValuesForSocietyRegistration, mockedPendingForms } from '../constants/FormConstants';
import { CorporationForm, SocietyRegistrationWithForm } from '../interfaces/FormInterfaces';
import { ManageCollectionActions } from '../interfaces/SocietyRegistrationInterfaces';
import AlertUtils from '../Utils/AlertUtils';

export interface Props { }

export interface State {
  pendingForms: SocietyRegistrationWithForm[];
  modalVisibility: boolean;
  modalContent: SocietyRegistrationWithForm;
}

export class SocietyRegistrationPendingForms extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      pendingForms: [],
      modalVisibility: false,
      modalContent: {
        societyRegistration: defaultValuesForSocietyRegistration,
        form: defaultValuesForForm,
      },
    }
  }

  componentDidMount() {
    // make request to get this information
    this.setState({
      pendingForms: mockedPendingForms
    })
  }

  sendMessage(regisTrationID: number, action: ManageCollectionActions, reason: string) {
    console.log(reason);
    
    alert(`envie el texto: ${reason}`)
  }
  
  handleUpdate(registrationId: number, action: ManageCollectionActions) {
    if ( action === ManageCollectionActions.reject) {
      AlertUtils.inputModal("Ingrese el comito del rechazo, por favor", "Escribir aqui ..", (text: any) => this.sendMessage(registrationId, action,text.value ))
      return;
    }
    else {
      this.sendMessage(registrationId, action, "");
      return;
    }
    alert("Send request to update de state");
  }

  showModal(societyRegistrationData: SocietyRegistrationWithForm) {
    this.setState({
      modalVisibility: true,
      modalContent: societyRegistrationData,
    })
  }

  render() {

    return (
      <>
        <Container>
          <div>
            <h1>
              Solicitudes de Registro Pendientes de Aprobacion
            </h1>
          </div>
          <ManageCollectionOfItems
            collection={this.state.pendingForms}
            showDataInModal={(societyRegistrationData: SocietyRegistrationWithForm) => this.showModal(societyRegistrationData)}
            handleUpdate={(id: number, operation: ManageCollectionActions) => this.handleUpdate(id, operation)}
          />
          <PendingContentModal
            societyRegistrationData={this.state.modalContent}
            show={this.state.modalVisibility}
            onClose={() => this.setState({ modalVisibility: false })}
          />
        </Container>
      </>
    );
  }

}