import * as React from 'react';
import { Container } from 'react-bootstrap';
import { societyWithFormInitializer } from '../../constants/FormConstants';
import { SocietyRegistrationWithForm } from '../../interfaces/FormInterfaces';
import { DashboardBackendResponse, SocietySearchConditions } from '../../interfaces/SocietyRegistrationInterfaces';
import SocietyService from '../../services/SocietyService';
import { AppTitle } from '../Generic/AppTitle';
import { GenericCard } from '../Generic/GenericCard';
import { PendingContentModal } from '../PendingContentModal';
import { CompletedCasesCard } from './CompletedCasesCard';
import { ExportsCard } from './ExportsCard';
import { NotaryAndStaffCard } from './NotaryAndStaffCard';

export interface Props { }

export interface State {
  dashboardData: DashboardBackendResponse | null;
  currentSociety: SocietyRegistrationWithForm;
  showModal: boolean;
}

export class DirectorsHomepage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dashboardData: null,
      currentSociety: societyWithFormInitializer,
      showModal: false
    }

    this.getSocietyData = this.getSocietyData.bind(this);
  }

  async componentDidMount() {
    const backendLogin = await SocietyService.LoginInBackend();
    const dashboardData = await SocietyService.getDashboardInformation();

    if (dashboardData.status) {
      this.setState({
        dashboardData: dashboardData.payload
      })
    }
  }

  async getSocietyData(societyName: string) {

    alert("VOY")
    const response = await SocietyService.getSocietyByCondition(societyName, SocietySearchConditions.societyName);
    this.setState({
      currentSociety: response[0],
      showModal: true
    })
  }



  render() {

    if (!!this.state.dashboardData === false) {
      return null;
    }

    console.log(this.state.dashboardData);


    const { info_completed_cases, info_entrada_escribano, info_exports } = this.state.dashboardData!;


    return (
      <>
        <Container className="mt-5 mb-4">
          <AppTitle
            title="Panel de Monitoreo"
            classes="mb-4"
          />
          <div className="d-flex row" style={{ justifyContent: 'space-evenly' }}>

            <NotaryAndStaffCard
              notariesAndStaff={info_entrada_escribano}
              handleModal={(societyName: string) => this.getSocietyData(societyName)}
            />

            <CompletedCasesCard
              completedCases={info_completed_cases}
            />

            <ExportsCard
              exports={info_exports}
            />

            <PendingContentModal
              show={this.state.showModal}
              societyRegistrationData={this.state.currentSociety}
              onClose={() => this.setState({ showModal: false, currentSociety: societyWithFormInitializer })}
            />


          </div>
        </Container>
      </>
    );
  }

}
