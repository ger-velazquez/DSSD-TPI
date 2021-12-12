import * as React from 'react';
import { Container } from 'react-bootstrap';
import { ManageCollectionOfItems } from '../components/Generic/ManageCollectionOfItems';
import { PendingContentModal } from '../components/PendingContentModal';
import { defaultValuesForForm, defaultValuesForSocietyRegistration, mockedPendingForms } from '../constants/FormConstants';
import { AlertTypes, CorporationForm, GenericHttpResponse, SocietyRegistrationWithForm } from '../interfaces/FormInterfaces';
import { ManageCollectionActions } from '../interfaces/SocietyRegistrationInterfaces';
import SocietyService from '../services/SocietyService';
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

  // async componentDidMount() {
  //   const response: SocietyRegistrationWithForm[] | any= await SocietyService.getPendingForms();
  //   if (response) {
  //     const updatedPendingForms = response;
  //     // const updatedPendingForms = mockedPendingForms;
  //     this.setState({
  //       pendingForms: updatedPendingForms
  //     })
  //   }
  // }

  async sendMessage(registrationID: number, action: ManageCollectionActions, reason: string) {
    const response: GenericHttpResponse<any> = await SocietyService.updatePendingForm(registrationID, action, reason, 0);
    if (response.status) {
      AlertUtils.notifyWithCallback(
        AlertTypes.success,
        "La actualizacion fue realizada con exito",
        () => window.location.reload()
      )
    }
    else {
      AlertUtils.notifyWithCallback(
        AlertTypes.error,
        "Ocurrio un error, intentelo mas tarde",
        () => window.location.reload()
      )
    }
  }
  
  handleUpdate(registrationId: number, action: ManageCollectionActions) {
    if ( action === ManageCollectionActions.reject) {
      AlertUtils.inputModal("Ingrese el motivo del rechazo, por favor", "Escribir aqui ..", (text: any) => this.sendMessage(registrationId, action,text.value ))
      return;
    }
    else {
      this.sendMessage(registrationId, action, "");
      return;
    }
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
