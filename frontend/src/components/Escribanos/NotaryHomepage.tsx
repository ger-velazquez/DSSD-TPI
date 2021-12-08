import { Formik } from 'formik';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { defaultValuesForSocietyRegistration, defaultValuesForForm } from '../../constants/FormConstants';
import { AlertTypes, GenericHttpResponse, SocietyRegistrationWithForm } from '../../interfaces/FormInterfaces';
import { ManageCollectionActions, PendingFormRejected } from '../../interfaces/SocietyRegistrationInterfaces';
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
        numberOfHoursForResend: 0,
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
  }

  async componentDidMount() {
    // const activeCases = await BonitaService.getActiveCases();
    // const collectionOfActiveCasesId = BonitaService.filterCasesId(activeCases);
    // console.log("FILTRADOS");
    // console.log(collectionOfActiveCasesId);
    // enviar request a backend, obteniendo el array de las sociedades con ese caseId y renderizandolos.

    const response: SocietyRegistrationWithForm[] | any = await SocietyService.getPendingForms();
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
          numberOfHoursForResend: -1,
        },
        showRejectionModal: true,
      })
    }
    else {
      this.sendMessage(registrationId, action, "", -1);
    }
  }

  async sendMessage(registrationID: number, action: ManageCollectionActions, reason: string, numberOfHoursForResend: number) {
    const response: GenericHttpResponse<any> = await SocietyService.updatePendingForm(registrationID, action, reason, numberOfHoursForResend);
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
        numberOfHoursForResend: -1,
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
                numberOfHoursForResend: 0,
              }}
              onSubmit={(form) => this.sendMessage(
                this.state.pendingFormRejected.registrationId,
                ManageCollectionActions.reject,
                this.state.pendingFormRejected.rejectReason,
                this.state.pendingFormRejected.numberOfHoursForResend
              )}
            // validate={(values) => this.handleValidations(values)}
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
