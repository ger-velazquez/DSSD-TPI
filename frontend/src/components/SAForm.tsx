export {}
export {}

// import { Formik, Form, Field } from 'formik';
// import * as React from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { defaultValuesForForm } from '../constants/FormConstants';
// import { CorporationForm, CountryAndState, DynamicCollections, DynamicFieldsOperations, Partner } from '../interfaces/FormInterfaces';
// import { GenericInputForm } from './Generic/GenericInputForm';
// import { cloneDeep } from 'lodash';
// import { PartnerFields } from './Generic/PartnerFields';
// import { CountryAndStateFields } from './Generic/CountryAndStateFields';
// import { GenericInputHeaderField } from './Generic/GenericInputHeaderField';
// import HttpClient from '../services/HttpClient';


// export interface Props { }

// export interface State {
//   validated: boolean;
//   corporationForm: CorporationForm;
//   collectionOfExportLocationsField: JSX.Element[];
//   collectionOfPartnersField: JSX.Element[];
// }
// //dv
// export class SAForm extends React.Component<Props, State> {

//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       validated: false,
//       corporationForm: defaultValuesForForm,
//       collectionOfExportLocationsField: [
//         <CountryAndStateFields
//           index={0}
//           onChange={(event, formKey, objectKey, index) => this.customHandleChange(event, formKey, objectKey, index)}
//         />
//       ],
//       collectionOfPartnersField: [
//         // <PartnerFields
//         //   index={0}
//         //   onChange={(event, formKey, objectKey, index) => this.customHandleChange(event, formKey, objectKey, index)}
//         // />
//       ]
//     }

//     this.customHandleChange = this.customHandleChange.bind(this);
//     this.addMediaContent = this.addMediaContent.bind(this);
//   }

//   addMediaContent(form: CorporationForm) {
//     const response = HttpClient.post(
//       "api/process",
//       {
//         "name": "Ger"
//       }
//     )

//   }

//   // formKey could be for partner or country locations
//   // objectKey could be any key of the form objects
//   // index corresponds to the position in the respective array

//   handleValidations(values: CorporationForm) {
//     let objectOfErrors = {};
//     const mandatoryFields: Array<string> = ["name", "creationDate", "statuteOfConformation", "legalDomicile", "realDomicile", "legalRepresentative", "email"];
//     mandatoryFields.forEach((field: string) => {
//       if (!(values as any)[field]) {
//         (objectOfErrors as any)[field] = "Required"
//       }
//     })

//     return objectOfErrors
//   }

//   handleAdditionalFields(typeOfDynamicField: DynamicCollections, operation: DynamicFieldsOperations) { // TODO: Refactor this 

//     let currentCollection: JSX.Element[] = [... this.state[typeOfDynamicField]];
//     let currentForm: CorporationForm = cloneDeep(this.state.corporationForm);
//     if (operation == DynamicFieldsOperations.add) {

//       const dynamicCollectionOfComponents = {
//         "collectionOfPartnersField": ( <> </>
//           // <PartnerFields
//           //   key={currentCollection.length}
//           //   index={currentCollection.length}
//           //   onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string, objectKey: string, index: number) => this.customHandleChange(event, formKey, objectKey, index)}
//           // />
//         ),
//         "collectionOfExportLocationsField": (
//           <CountryAndStateFields
//             key={currentCollection.length}
//             index={currentCollection.length}
//             onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string, objectKey: string, index: number) => this.customHandleChange(event, formKey, objectKey, index)}
//           />
//         )
//       }
//       if (DynamicCollections.collectionOfPartnersField == typeOfDynamicField) {
//         currentForm.partners.push({} as Partner)
//       }
//       else {
//         currentForm.exportLocations.push({} as CountryAndState);
//       }

//       currentCollection.push(dynamicCollectionOfComponents[typeOfDynamicField]);
//     }
//     else {
//       currentCollection.pop();
//       if (DynamicCollections.collectionOfPartnersField == typeOfDynamicField) {
//         currentForm.partners.pop();
//       }
//       else {
//         currentForm.exportLocations.pop();
//       }
//     }

//     if (DynamicCollections.collectionOfPartnersField == typeOfDynamicField) {

//       this.setState({
//         collectionOfPartnersField: currentCollection,
//         corporationForm: currentForm
//       })
//     }
//     else {
//       this.setState({
//         collectionOfExportLocationsField: currentCollection,
//         corporationForm: currentForm,
//       })
//     }
//   }



//   customHandleChange(event: React.ChangeEvent<HTMLInputElement>, formKey: string, objectKey?: string, index?: number) {
//     let formToBeUpdated = cloneDeep(this.state.corporationForm);
//     (formToBeUpdated as any)[formKey] = event.target.value;
//     this.setState({
//       corporationForm: formToBeUpdated,
//     })
//   }
//   // (formToBeUpdated as any)[formKey][index][objectKey] = event.target.value;






//   render() {
//     console.log(this.state.corporationForm.partners);

//     const partnersLength: number = this.state.collectionOfPartnersField.length;
//     const locationsLength: number = this.state.collectionOfExportLocationsField.length;

//     return (
//       <>
//       </>
//     );
//   }

// }

// // // // {/* <Container className="mt-4">
// // // //   <h1>
// // // //     Formulario de Inscripcion para una Sociedad Anonima
// // // //   </h1>
// // // //   <Formik
// // // //     initialValues={defaultValuesForForm}
// // // //     onSubmit={(form) => this.addMediaContent(form)}
// // // //     validate={(values) => this.handleValidations(values)}
// // // //   >
// // // //     <Form>
// // // //       <Row>
// // // //         <Col md="6" sm="12" >
// // // //           <GenericInputForm
// // // //             name="name"
// // // //             type="text"
// // // //             labelText="Nombre de la SA"
// // // //             onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
// // // //           />


// // // //           <GenericInputForm
// // // //             name="realDomicile"
// // // //             type="string"
// // // //             labelText="Domicilio Real"
// // // //             onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
// // // //           />

// // // //           <GenericInputForm
// // // //             name="creationDate"
// // // //             type="date"
// // // //             labelText="Fecha de Creacion"
// // // //             onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)}
// // // //           />

// // // //           {/* <GenericInputForm
// // // //                     name="Representante Legal"
// // // //                     as="select"
// // // //                     labelText="Representante Legal"
// // // //                     collectionOfContent={["Usuario de Prueba"]}
// // // //                   /> */}

// // // //           <GenericInputForm
// // // //             name="statuteOfConformation"
// // // //             type="file"
// // // //             accept=".pdf"
// // // //             labelText="Estatuto de conformacion"
// // // //             onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)} />

// // // //         </Col>

// // // //         <Col md="6" sm="12" >
// // // //           <GenericInputForm
// // // //             name="email"
// // // //             type="text"
// // // //             labelText="Email"
// // // //             onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)} />

// // // //           <GenericInputForm
// // // //             name="legalDomicile"
// // // //             type="string"
// // // //             labelText="Domicilio Legal"
// // // //             onChange={(event: React.ChangeEvent<HTMLInputElement>, formKey: string) => this.customHandleChange(event, formKey)} />

// // // //           <div >
// // // //             <div className="d-flex justify-content-center">
// // // //               <GenericInputHeaderField
// // // //                 typeOfDynamicField={DynamicCollections.collectionOfPartnersField}
// // // //                 title="Socios"
// // // //                 currentAmountOfItems={partnersLength}
// // // //                 handleAdditionalFields={(typeOfDynamicField: DynamicCollections, operation: DynamicFieldsOperations) => this.handleAdditionalFields(typeOfDynamicField, operation)}
// // // //               />
// // // //             </div>
// // // //             <div>
// // // //               {
// // // //                 this.state.collectionOfPartnersField.map((countryField: JSX.Element) => {
// // // //                   return (
// // // //                     <div className="mb-2">
// // // //                       {countryField}
// // // //                     </div>
// // // //                   )
// // // //                 })
// // // //               }
// // // //             </div>

// // // //           </div>


// // // //           <div >
// // // //             <div className="d-flex justify-content-center">
// // // //               <GenericInputHeaderField
// // // //                 typeOfDynamicField={DynamicCollections.collectionOfExportLocationsField}
// // // //                 title="Zonas de Exportacion"
// // // //                 currentAmountOfItems={locationsLength}
// // // //                 handleAdditionalFields={(typeOfDynamicField: DynamicCollections, operation: DynamicFieldsOperations) => this.handleAdditionalFields(typeOfDynamicField, operation)}
// // // //               />
// // // //             </div>
// // // //             {
// // // //               this.state.collectionOfExportLocationsField.map((countryField: JSX.Element) => {
// // // //                 return (
// // // //                   <div className="mb-2">
// // // //                     {countryField}
// // // //                   </div>
// // // //                 )
// // // //               })
// // // //             }
// // // //           </div>

// // // //         </Col>
// // // //       </Row>


// // // //       <Row className="mb-3 d-flex justify-content-center">
// // // //         <div>
// // // //           <button type="submit"> Cargar </button>
// // // //         </div>
// // // //       </Row>

// // // //     </Form>

// // // //   </Formik>
// // // // </Container>
// // // //  */}

// // export default injectSheet(style)(component)
