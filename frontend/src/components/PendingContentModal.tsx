import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CorporationForm, CountryAndState, Partner, SocietyRegistrationWithForm } from '../interfaces/FormInterfaces';
import { GenericModal } from './Generic/GenericModal';
import { SocietyData } from './SocietyViews/SocietyData';

export interface Props {
  societyRegistrationData: SocietyRegistrationWithForm;
  show: boolean;
  onClose: () => void;
}

export interface State { }

export class PendingContentModal extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  getSocietyKeys() {

  }

  render() {
    const { form: societyData } = this.props.societyRegistrationData;
    return (
      <>
        <GenericModal
          show={this.props.show}
          title="Informacion de la Sociedad"
          onClose={() => this.props.onClose()}
        >
          <Row>
            <Col xs={12} md={12} sm={12}>
              <SocietyData
                societyData={societyData}
              />
            </Col>
          </Row>
        </GenericModal>
      </>
    );
  }

}
