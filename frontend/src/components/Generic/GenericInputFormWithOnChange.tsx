import { Field } from 'formik';
import * as React from 'react';
import { CorporationForm } from '../../interfaces/FormInterfaces';
import { GenericFormSelectValues } from './GenericFormSelectValues';

export interface Props {
  name: string;
  type?: string;
  labelText: string;
  as?: string;
  accept?:string; 
  collectionOfContent?: Array<any>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, formKey: string) => void;
}

export interface State { }

export class GenericInputFormWithOnChange extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { name, type, labelText, collectionOfContent, as, accept } = this.props;
    return (
      <div className="mb-3">
        <div>
          <label htmlFor={name}> {labelText} </label>
        </div>
        <Field
          as={as? as : null}
          name={name}
          type={type? type : null}
          accept={accept? accept : null}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event, name)}
        >
          {
            collectionOfContent &&
            <GenericFormSelectValues
              collectionOfContent={collectionOfContent}
            />
          }

        </Field>
      </div>
    );
  }

}

// export default injectSheet(style)(component)
