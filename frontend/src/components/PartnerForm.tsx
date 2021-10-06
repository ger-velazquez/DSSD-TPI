import * as React from 'react';
import { GenericInputForm } from './Generic/GenericInputForm';



export interface Props { }

export interface State { }

export class PartnerForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <GenericInputForm
          name="name"
          type="text"
          labelText="Nombre de la SA"
        />
      </>
    );
  }

}

// export default injectSheet(style)(component)
