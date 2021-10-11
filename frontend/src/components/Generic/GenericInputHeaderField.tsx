import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { DynamicCollections } from '../../interfaces/FormInterfaces';


export interface Props {
  title: string;
  collectionType: DynamicCollections;
  onClick: (collectionType: DynamicCollections) => void;
}

export interface State { }

export class GenericInputHeaderField extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { title } = this.props;
    return (
      <div className="d-flex flex-row">
        <div className="pr-3" style={{ fontSize: '1.25em', fontWeight: 800 }}>
          {title}
        </div>
        <div onClick={() => this.props.onClick(this.props.collectionType)}>
          <FontAwesomeIcon
            icon={faEdit}
          />
        </div>
      </div>
    );
  }

}

// export default injectSheet(style)(component)
