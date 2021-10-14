import { Field } from 'formik';
import * as React from 'react';
import { defaultCountries } from '../../constants/FormConstants';
import { GenericFormSelectValues } from './GenericFormSelectValues';

export interface Props { }

export interface State { }

export class CountryAndStateFields extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    // 
    return (
      <>
        <div>
          <div>
            <label htmlFor={"country"}> Pais donde Exporta </label>
          </div>
          <Field
            className="w-100"
            name={`country`}
            as='select'
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
            className="w-100"
            name={`state`}
            type="text"
          />
        </div>

      </>
    );
  }

}

// export default injectSheet(style)(component)
