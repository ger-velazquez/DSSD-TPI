import { faPenFancy, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { societyWithFormInitializer } from '../../constants/FormConstants';
import { SocietyRegistrationWithForm } from '../../interfaces/FormInterfaces';
import { DashboardBackendResponseNotary, SocietySearchConditions } from '../../interfaces/SocietyRegistrationInterfaces';
import SocietyService from '../../services/SocietyService';
import { GenericCard } from '../Generic/GenericCard';
import { GenericDivider } from '../Generic/GenericDivider';
import { SocietyData } from '../SocietyViews/SocietyData';

export interface Props {
  notariesAndStaff: DashboardBackendResponseNotary;
  handleModal: (societyName: string) => void;
}

export interface State {

}

export class NotaryAndStaffCard extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

  }

  render() {
    const { count_entrada, list_entrada, count_escribano, list_escribano } = this.props.notariesAndStaff;

    return (
      <>
        <GenericCard classes="p-3 text-left">
          <Card.Header className="text-center">
            <h4>
              Estado de casos
            </h4>
            <h6>
              (Mesa de Entrada y Escribanos)
            </h6>

          </Card.Header>

          <Card.Body>
            <div className="mb-2 mt-4">
              <span className="font-weight-bold "> Cantidad de Casos en Mesa de Entrada: </span> {count_entrada}
            </div>

            <div className="mb-4">
              <Row>
                <Col>
                  <div className=" text-left pb-2">
                    <div>
                      <span className="font-weight-bold "> Sociedades en Mesa de entrada: </span>
                    </div>
                  </div>
                  {
                    list_entrada.map((societyName: string) => {
                      return (
                        <div onClick={() => this.props.handleModal(societyName)} className="mb-1" style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
                          <div className="cursor-pointer pr-2">
                            <FontAwesomeIcon
                              icon={faUserTie}
                            />
                          </div>
                          <div>
                            {societyName}
                          </div>
                        </div>
                      )
                    })
                  }
                </Col>
              </Row>
            </div>

            <GenericDivider />

            <div className="mb-2 mt-4 text-left">
              <div>
                <span className="font-weight-bold "> Cantidad de Casos en Escribanos: </span> {count_escribano}
              </div>
            </div>

            <div className="mb-4">
              <Row>
                <Col>
                  <div className=" text-left pb-2">
                    <div>
                      <span className="font-weight-bold "> Sociedades en Escribanos: </span>
                    </div>
                  </div>
                  {
                    list_escribano.map((societyName: string) => {
                      return (
                        <div className="mb-1" style={{ display: 'flex', flexDirection: 'row' }}>
                          <div className="pr-2">
                            <FontAwesomeIcon
                              icon={faPenFancy}
                            />
                          </div>
                          <div>
                            {societyName}
                          </div>
                        </div>
                      )
                    })
                  }
                </Col>
              </Row>
            </div>
          </Card.Body>
        </GenericCard>
      </>
    )
  }
}