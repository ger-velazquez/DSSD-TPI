import { Field } from 'formik';
import * as React from 'react';

export interface Props {
  name: string;
  type?: string;
  labelText: string;
  as?: string;
  collectionOfContent?: Array<any>;
}

export interface State { }

export class GenericDynamicInputForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { name, type, labelText, collectionOfContent, as } = this.props;

    return (
      <>
        {/* <div>
          <label htmlFor={name}> {labelText} </label>
        </div>
        <Field
          as={as ? as : null}
          name={name}
          type={type ? type : null}
          onBlur={ (event) => this.props.handleChange }
        >
          {
            collectionOfContent &&
            <GenericFormSelectValues
              collectionOfContent={collectionOfContent}
            />
          }

        </Field> */}
      </>
    );
  }

}

// export default injectSheet(style)(component)