import { Field } from 'formik';
import * as React from 'react';
import { CorporationForm } from '../../interfaces/FormInterfaces';

export interface Props {
  index: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, arrayKey: keyof CorporationForm, objectKey: string, index: number) => void;
}

export interface State { }

export class PartnerFields extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { index } = this.props;

    return (
      <>
        <div>
          <div>
            <label htmlFor={"firstName"}> Nombre </label>
          </div>
          <Field
            name={`partners[${index}][firstName]`}
            type="text"
          />
        </div>


        <div>
          <div>
            <label htmlFor={"lastName"}> Apellido </label>
          </div>
          <Field
            name={`partners[${index}][lastName]`}
            type="text"
          />
        </div>

        <div>
          <div>
            <label htmlFor={"percentageOfContributions"}> Porcentaje de Contribucion </label>
          </div>
          <Field
            name={`partners[${index}][percentageOfContributions]`}
            type="number"
          />
        </div>

      </>
    );
  }

}

// export default injectSheet(style)(component)
