import { Field } from 'formik';
import * as React from 'react';
import { CorporationForm } from '../../interfaces/FormInterfaces';

export interface Props { }

export interface State { }

export class PartnerFields extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {

    return (
      <>
        <div>
          <div>
            <label htmlFor={"firstName"}> Nombre </label>
          </div>
          <Field
            className="w-100"
            name={`firstName`}
            type="text"
          />
        </div>


        <div>
          <div>
            <label htmlFor={"lastName"}> Apellido </label>
          </div>
          <Field
            className="w-100"
            name={`lastName`}
            type="text"
          />
        </div>

        <div>
          <div>
            <label htmlFor={"percentageOfContributions"}> Porcentaje de Contribucion </label>
          </div>
          <Field
            className="w-100"
            name={`percentageOfContributions`}
            type="number"
          />
        </div>

      </>
    );
  }

}

// export default injectSheet(style)(component)
