import { Field } from 'formik';
import * as React from 'react';
import { defaultCountries } from '../../constants/FormConstants';
import { CorporationForm } from '../../interfaces/FormInterfaces';
import { GenericFormSelectValues } from './GenericFormSelectValues';

export interface Props {
  index: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, arrayKey: keyof CorporationForm, objectKey: string, index: number) => void;
}

export interface State { }

export class CountryAndStateFields extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { index } = this.props;

    return (
      <>
        <div>
          <div>
            <label htmlFor={"country"}> Pais donde Exporta </label>
          </div>
          <Field
            name="country"
            as='select'
            onBlur={
              (event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event, 'exportLocations', 'country', index)
            }
          >
            <GenericFormSelectValues
              collectionOfContent={defaultCountries}
            />
          </Field>
        </div>


        <div>
          <div>
            <label htmlFor={"state"}> Estado donde Exporta </label>
          </div>
          <Field
            name="state"
            type="text"
            onBlur={
              (event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event, 'exportLocations', 'state', index)
            }
          />
        </div>

      </>
    );
  }

}

// export default injectSheet(style)(component)
