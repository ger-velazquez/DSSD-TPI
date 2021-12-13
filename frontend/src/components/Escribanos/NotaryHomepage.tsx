import { Formik, Form } from 'formik';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { defaultValuesForSocietyRegistration, defaultValuesForForm } from '../../constants/FormConstants';
import { ProcessStep } from '../../interfaces/BonitaInterfaces';
import { AlertTypes, GenericHttpResponse, SocietyRegistrationWithForm } from '../../interfaces/FormInterfaces';
import { ManageCollectionActions, PendingFormRejected } from '../../interfaces/SocietyRegistrationInterfaces';
import BonitaService from '../../services/BonitaService';
import SocietyService from '../../services/SocietyService';
import AlertUtils from '../../Utils/AlertUtils';
import { AppTitle } from '../Generic/AppTitle';
import { GenericInputForm } from '../Generic/GenericInputForm';
import { GenericModal } from '../Generic/GenericModal';
import { ManageCollectionOfItems } from '../Generic/ManageCollectionOfItems';
import { PendingContentModal } from '../PendingContentModal';

export interface Props { }

export interface State {
  pendingForms: Array<SocietyRegistrationWithForm>;
  showRejectionModal: boolean;
  pendingFormRejected: PendingFormRejected;
  showSociety: {
    modalVisibility: boolean;
    modalContent: SocietyRegistrationWithForm;
  }
}

export class NotaryHomepage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      pendingForms: [],
      showRejectionModal: false,
      pendingFormRejected: {
        rejectReason: "",
        registrationId: -1,
      },
      showSociety: {
        modalVisibility: false,
        modalContent: {
          societyRegistration: defaultValuesForSocietyRegistration,
          form: defaultValuesForForm,
        },
      }
    }

    this.sendMessage = this.sendMessage.bind(this);
  }

  async componentDidMount() {

    const userInformation = BonitaService.getUserInformationInLocalStorage();
    const bonitaToken = userInformation.bonitaToken;
    const userId = userInformation.currentUserId;
    const jsessionId = userInformation.currentJsessionId;
    const responseTest = await BonitaService.sendLoginToBackend(userId, bonitaToken, jsessionId);

    const activeCases = await BonitaService.getActiveCases();
    const collectionOfActiveCasesId = BonitaService.filterCasesId(activeCases).toString();

    const response: SocietyRegistrationWithForm[] | any = await SocietyService.getPendingForms(collectionOfActiveCasesId, ProcessStep.validateProcess);
    if (response) {
      const updatedPendingForms = response;
      // const updatedPendingForms = mockedPendingForms;
      this.setState({
        pendingForms: updatedPendingForms
      })
    }
  }

  handleUpdate(registrationId: number, action: ManageCollectionActions) {
    if (action === ManageCollectionActions.reject) {
      this.setState({
        pendingFormRejected: {
          registrationId: registrationId,
          rejectReason: "",
        },
        showRejectionModal: true,
      })
    }
    else {
      this.sendMessage(registrationId, action, "");
    }
  }

  async sendMessage(registrationID: number, action: ManageCollectionActions, reason: string) {
    const response: GenericHttpResponse<any> = await SocietyService.updatePendingProcess(registrationID, action, reason);
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

  resetModal() {
    this.setState({
      showRejectionModal: false,
      pendingFormRejected: {
        registrationId: -1,
        rejectReason: "",
      }
    })
  }


  customHandleChange(event: React.ChangeEvent<HTMLInputElement>, formKey: string) {
    let pendingFormRejected = cloneDeep(this.state.pendingFormRejected);
    (pendingFormRejected as any)[formKey] = event.target.value;
    this.setState({
      pendingFormRejected: pendingFormRejected,
    })
  }

  render() {
    return (
      <Container>
        <AppTitle
          title="Validar Tramite"
        />
        <ManageCollectionOfItems
          collection={this.state.pendingForms}
          showDataInModal={(societyRegistrationData: SocietyRegistrationWithForm) => this.setState({ showSociety: { modalVisibility: true, modalContent: societyRegistrationData } })}
          handleUpdate={(id: number, operation: ManageCollectionActions) => this.handleUpdate(id, operation)}

        />


        <GenericModal
          show={this.state.showRejectionModal}
          title="Rejection"
          onClose={() => this.resetModal()}
        >
          <div>

            <Formik
              initialValues={{
                rejectReason: "",
              }}
              onSubmit={(form) => this.sendMessage(
                this.state.pendingFormRejected.registrationId,
                ManageCollectionActions.reject,
                this.state.pendingFormRejected.rejectReason,
              )}
            >
              <Form>
                <Row>
                  <Col md="12" sm="12">
                    <GenericInputForm
                      name="rejectReason"
                      type="text"
                      labelText="Motivo del Rechazo"
                      onKeyUp={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
                    />

                    <Row className="mb-3 mx-auto">
                      <div>
                        <button type="submit"> Enviar  </button>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Form>

            </Formik>

          </div>
        </GenericModal>

        <PendingContentModal
          societyRegistrationData={this.state.showSociety.modalContent}
          show={this.state.showSociety.modalVisibility}
          onClose={() => this.setState({
            showSociety: {
              modalVisibility: false,
              modalContent: {
                societyRegistration: defaultValuesForSocietyRegistration,
                form: defaultValuesForForm,
              },
            }
          })}
        />
      </Container>
    );
  }

}
