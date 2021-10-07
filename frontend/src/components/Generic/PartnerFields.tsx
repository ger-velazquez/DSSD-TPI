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
            name="firstName"
            type="text"
            onBlur={
              (event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event, 'partners', 'firstName', index)
            }
          />
        </div>


        <div>
          <div>
            <label htmlFor={"lastName"}> Apellido </label>
          </div>
          <Field
            name="lastName"
            type="text"
            onBlur={
              (event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event, 'partners', 'lastName', index)
            }
          />
        </div>

        <div>
          <div>
            <label htmlFor={"percentageOfContributions"}> Porcentaje de Contribucion </label>
          </div>
          <Field
            name="percentageOfContributions"
            type="number"
            onBlur={
              (event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event, 'partners', 'percentageOfContributions', index)
            }
          />
        </div>

      </>
    );
  }

}

// export default injectSheet(style)(component)
