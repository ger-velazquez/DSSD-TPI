import * as React from 'react';
import { Card } from 'react-bootstrap';
import { DashboardBackendResponseCountry, DashboardBackendResponseCountryLanguage } from '../../interfaces/SocietyRegistrationInterfaces';
import { GenericCard } from '../Generic/GenericCard';

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
        <GenericCard classes="p-3">
          <Card.Header className="text-center">
            <h4>
              Exportaciones
            </h4>
            <h6>
              (Casos Archivados)
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
                      <div className="mb-2">
                        <span className="font-weight-bold "> Nombre: </span> {exportData.name}
                      </div>

                      <div className="mb-2" >
                        <span> Cantidad de exportaciones hacia el pais: {exportData.quantity} </span>
                      </div>

                      <div className="mb-2" >
                        <div> Moneda: {exportData.currency}  </div>
                      </div>

                      <div className="mb-2" >
                        <span> Capital: {exportData.capital} </span>
                      </div>

                      <div className="mb-1" >
                        <span> Lenguas: </span>
                      </div>
                      <div>
                        {
                          exportData.languages.map((languageData) => {
                            return (
                              <>
                                <div className="mb-1" >
                                  {languageData.name}
                                </div>
                              </>
                            )
                          })
                        }
                      </div>
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
