import { faCheck, faFolder, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CorporationForm, SocietyRegistrationWithForm } from '../../interfaces/FormInterfaces';
import { ManageCollectionActions } from '../../interfaces/SocietyRegistrationInterfaces';
import SocietyService from '../../services/SocietyService';

export interface Props {
  collection: Array<SocietyRegistrationWithForm>;
  showDataInModal: (form: SocietyRegistrationWithForm) => void;
  handleClick: (id: number) => void;
}

export interface State { }

export class ManageCollectionOfItemsGenerateFolder extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  // create hierarchy to define an object to manage individual renders

  
  render() {
    return (
      <>
        <div>
          {
            this.props.collection.map((element: SocietyRegistrationWithForm) => {
              return (
                <div>
                  <Row className="mx-auto">
                    <Col xs="6" md="6" sm="6" >
                      <div className="d-flex justify-content-start" onClick={() => this.props.showDataInModal(element)} >
                        {
                          element.form.name
                        }
                      </div>
                    </Col>

                    <Col xs="6" md="6" sm="6">
                      <div className="d-flex justify-content-end flew-row" >
                        <div onClick={() => this.props.handleClick(element.societyRegistration.id)} >
                          <FontAwesomeIcon
                            icon={faFolder}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )
            })
          }
        </div>
      </>
    );
  }

}

// this.props.manageCollectionConfiguration.collection.map((aManagedCollection: ManageCollectionInterface, index: number) => {
//   return (
//     <div key={index} >
//       <Accordion key={1} defaultActiveKey={"1"} >
//         <Card>
//           <Card.Header>
//             <Accordion.Toggle as={Button} variant="" eventKey="1" >
//               <div className="d-flex flex-row " >
//                 <div className="mr-3">
//                   Titulo
//                 </div>
//                 <div className="d-flex flex-row">
//                   <div className="mr-3" onClick={() => this.props.manageCollectionConfiguration.handleUpdateStatus(aManagedCollection.collectionId, ManageCollectionActions.accept)}>
//                     Accept
//                   </div>
//                   <div className="mr-3" onClick={() => this.props.manageCollectionConfiguration.handleUpdateStatus(aManagedCollection.collectionId, ManageCollectionActions.reject)}>
//                     Reject
//                   </div>
//                 </div>
//               </div>
//             </Accordion.Toggle>
//           </Card.Header>
//         </Card>
//       </Accordion>
//     </div>
//   )
// })