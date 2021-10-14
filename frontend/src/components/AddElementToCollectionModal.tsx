import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CountryAndState, DynamicCollections, InitialValuesToCollectionsModal, OnSubmitToTheCollection, Partner } from '../interfaces/FormInterfaces';
import { GenericModal } from './Generic/GenericModal';

export interface Props {
  show: boolean;
  title: string;
  collectionType: DynamicCollections;
  onClose: () => void;
  onSubmit: OnSubmitToTheCollection;
  onDelete: (collection: DynamicCollections, index: number) => void;
  currentCollection: Array<InitialValuesToCollectionsModal>;
  initialValues: InitialValuesToCollectionsModal;
  specificForm: JSX.Element;
}

export interface State { }

export class AddElementToCollectionModal extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  renderElement(element: InitialValuesToCollectionsModal): JSX.Element {
    if (this.props.collectionType == DynamicCollections.partners) {
      return (
        <div>
          {`${(element as Partner).firstName} ${(element as Partner).lastName} | P: ${(element as Partner).percentageOfContributions}`}
        </div>
      )
    }
    else {
      return (
        <div>
          { `Country: ${(element as CountryAndState).country} State: ${(element as CountryAndState).state}` }
        </div>
      )
    }
  }

  render() {
    const { show, title, collectionType, currentCollection, initialValues, specificForm } = this.props;
    return (
      <>
        <GenericModal
          show={show}
          title={title}
          onClose={() => this.props.onClose()}
        >
          <Row>
            <Col md="6" xs="12" lg="6" style={{ borderRightColor: 'grey' }}>
              <div className="mb-3" style={{ fontWeight: 600 }}> 
                {`Agregar ${title}`}
              </div>
              <div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => this.props.onSubmit(values, collectionType)}
                >
                  <Form>
                    {specificForm}
                    <Row className="mt-3 d-flex justify-content-center">
                      <div>
                        <button type="submit"> Agregar </button>
                      </div>
                    </Row>
                  </Form>
                </Formik>
              </div>
            </Col>
            <Col md="6" xs="12" lg="6">
              <div className="mb-3" style={{ fontWeight: 600 }}>
                {`${title} actuales`}
              </div>
              <div>
                {
                  currentCollection && currentCollection.map((element, index) => {
                    return (
                      <div className="d-flex flex-row">
                        <div>
                          {this.renderElement(element)}
                        </div>
                        <div onClick={() => this.props.onDelete(collectionType, index)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Col>
          </Row>
        </GenericModal>
      </>
    );
  }

}

// export default injectSheet(style)(component)
