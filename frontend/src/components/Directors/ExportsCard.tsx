import * as React from 'react';
import { Card } from 'react-bootstrap';
import { DashboardBackendResponseCountry, DashboardBackendResponseCountryLanguage } from '../../interfaces/SocietyRegistrationInterfaces';
import { GenericCard } from '../Generic/GenericCard';
import { GenericDivider } from '../Generic/GenericDivider';

export interface Props {
  exports: DashboardBackendResponseCountry[]
}

export interface State { }

export class ExportsCard extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { exports } = this.props;

    return (
      <>
        <GenericCard classes="p-3 text-left m-3">
          <Card.Header className="text-center">
            <h4>
              Exportaciones
            </h4>
            <h6>
              (Casos Completados)
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="mb-2 mt-4">
              <span className="font-weight-bold "> Paises con mas exportaciones</span>
            </div>

            <div>
              {
                exports.map((exportData) => {
                  return (
                    <>
                      <div className="mb-2 mt-2">
                        <span className="font-weight-bold "> Nombre: </span> {exportData.name}
                      </div>

                      <div className="mb-2" >
                        <span style={{ textDecoration: 'underline' }}> Cantidad de exportaciones hacia el pais: {exportData.quantity} </span>
                      </div>

                      <div className="mb-2" >
                        <span style={{ textDecoration: 'underline' }}> Moneda:   </span> {exportData.currency}
                      </div>

                      <div className="mb-2" >
                        <span style={{ textDecoration: 'underline' }}> Capital:  </span> {exportData.capital}
                      </div>

                      <div className="mb-1" >
                        <span style={{ textDecoration: 'underline' }}> Lenguas (Ingles): </span>
                      </div>
                      <div>
                        <ul>


                          {
                            exportData.languages.map((languageData) => {
                              return (
                                <>
                                  <li className="mb-1" >
                                    {languageData.name}
                                  </li>

                                </>
                              )
                            })
                          }
                        </ul>
                      </div>
                      <GenericDivider />
                    </>
                  )
                })
              }
            </div>
          </Card.Body>
        </GenericCard>
      </>
    );
  }

}
