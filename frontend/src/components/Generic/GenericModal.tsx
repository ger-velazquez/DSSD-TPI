import * as React from 'react';
import { Modal } from 'react-bootstrap';

export interface Props {
  show: boolean;
  title: string;
  onClose: () => void;
}

export interface State { }

export class GenericModal extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { show, title } = this.props;
    return (
      <>
        <Modal
          size={"lg"}
          show={show}
          onHide={() => this.props.onClose()}
        >
          <Modal.Header closeButton style={{ fontSize: '1.25em', fontWeight: 800 }}>
            {title}
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>

        </Modal>
      </>
    );
  }

}

// export default injectSheet(style)(component)
