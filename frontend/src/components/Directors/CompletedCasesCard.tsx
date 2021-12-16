import { faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { DashboardBackendResponseCompletedCases } from '../../interfaces/SocietyRegistrationInterfaces';
import { GenericCard } from '../Generic/GenericCard';

export interface Props {
  completedCases: DashboardBackendResponseCompletedCases;
}

export interface State { }

export class CompletedCasesCard extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { count, total_minutes, average, list_completed } = this.props.completedCases;

    return (
      <>
        <GenericCard classes="p-3 text-left">
          <Card.Header className="text-center">
            <h4>
              Casos Archivados
            </h4>
            <h6>
              (Actuales)
            </h6>

          </Card.Header>
          <Card.Body>
            <div className="mb-2 mt-4">
              <span className="font-weight-bold "> Cantidad de Casos archivados: </span> {count}
            </div>

            <div className="mb-2">
              <span className="font-weight-bold "> Tiempo en minutos: </span> {total_minutes}
            </div>

            <div className="mb-2">
              <span className="font-weight-bold "> Tiempo promedio de resolucion en minutos: </span> {average}
            </div>

            <div className="mb-4" >
              <Row>
                <Col>
                  <div className=" text-left pb-2">
                    <div>
                      <span className="font-weight-bold "> Sociedades archivadas: </span>
                    </div>
                  </div>
                  {
                    list_completed.map((societyName: string) => {
                      return (
                        <div className="mb-1" style={{ display: 'flex', flexDirection: 'row' }}>
                          <div className="pr-2">
                            <FontAwesomeIcon
                              icon={faFileArchive}
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
    );
  }

}
