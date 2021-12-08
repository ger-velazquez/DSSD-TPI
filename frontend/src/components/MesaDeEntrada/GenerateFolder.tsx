import * as React from 'react';
import { Container } from 'react-bootstrap';
import { defaultValuesForSocietyRegistration, defaultValuesForForm } from '../../constants/FormConstants';
import { SocietyRegistrationWithForm } from '../../interfaces/FormInterfaces';
import { PendingFormRejected } from '../../interfaces/SocietyRegistrationInterfaces';
import SocietyService from '../../services/SocietyService';
import { AppTitle } from '../Generic/AppTitle';
import { ManageCollectionOfItems } from '../Generic/ManageCollectionOfItems';
import { ManageCollectionOfItemsGenerateFolder } from '../Generic/ManageCollectionOfItemsGenerateFolder';
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

export class GenerateFolder extends React.Component<Props, State> {

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


  render() {
    return (
      <Container>
        <AppTitle
          title="Generar Carpetas"
        />
        <ManageCollectionOfItemsGenerateFolder
          collection={this.state.pendingForms}
          showDataInModal={(societyRegistrationData: SocietyRegistrationWithForm) => this.setState({ showSociety: { modalVisibility: true, modalContent: societyRegistrationData } })}
        />


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
