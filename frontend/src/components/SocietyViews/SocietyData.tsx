import * as React from 'react';
import { CorporationForm, CountryAndState, Partner } from '../../interfaces/FormInterfaces';

export interface Props {
  societyData: CorporationForm;
}

export interface State { }

export class SocietyData extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { societyData } = this.props;
    return (
      <>
        <div className="mb-3 ">
          <span className="font-weight-bold "> Nombre: </span>  {societyData.name}
        </div>
        <div className="mb-3 " >
          <span className="font-weight-bold "> Fecha de Creacion: </span> {societyData.creationDate}
        </div>

        <div className="mb-3 " >
          <span className="font-weight-bold "> Domicilio Legal: </span>   {societyData.legalDomicile}
        </div>

        <div className="mb-3 " >
          <span className="font-weight-bold "> Domicilio Real: </span>  {societyData.realDomicile}
        </div>

        <div className="mb-3 " >
          <span className="font-weight-bold "> Email: </span>  {societyData.email}
        </div>

        <div className="mb-3 " >
          <span className="font-weight-bold "> Socios </span>
          <ul>
            {
              societyData.partners.map((partner: Partner) => {
                return (
                  <li className="mb-2">

                    <div className="mb-1">
                      Nombre: {`${partner.firstName} ${partner.lastName}`}
                    </div>
                    <div >
                      Porcentaje de Contribucion: {partner.percentageOfContributions}
                    </div>
                    <div>
                      {
                        partner.isLegalRepresentative &&
                        <div className="mb-1">
                          Representante legal
                        </div>
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        {
          societyData.exportLocations.length > 0 &&
          <div className="mb-3" >
            <span className="font-weight-bold "> Lugares de Exportacion: </span>
            <ul>
              {
                societyData.exportLocations.map((exportLocation: CountryAndState) => {
                  return (
                    <li className="mb-2">
                      <div className="mb-1">
                        Pais: {exportLocation.country}
                      </div>
                      <div>
                        Estado: {exportLocation.state}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }

      </>
    );
  }

}
