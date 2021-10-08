import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { CorporationForm, DynamicCollections, DynamicFieldsOperations } from '../../interfaces/FormInterfaces';


export interface Props {
  typeOfDynamicField: DynamicCollections;
  handleAdditionalFields: (typeOfDynamicField: DynamicCollections, operation: DynamicFieldsOperations) => void;
  title: string;
  currentAmountOfItems: number
}

export interface State { }

export class GenericInputHeaderField extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { typeOfDynamicField, title, currentAmountOfItems } = this.props;
    return (
      <div className="d-flex flex-row">
        <div className="pr-3" style={{ fontSize: '1.25em', fontWeight: 800 }}>
          {title}
        </div>
        <div className="pr-2" onClick={() => this.props.handleAdditionalFields(typeOfDynamicField, DynamicFieldsOperations.add)} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="pr-2" onClick={() => this.props.handleAdditionalFields(typeOfDynamicField, DynamicFieldsOperations.delete)} style={{ cursor: 'pointer' }}>
          {
            currentAmountOfItems > 1 &&
            <FontAwesomeIcon icon={faTrash} />
          }
        </div>
      </div>
    );
  }

}

// export default injectSheet(style)(component)
