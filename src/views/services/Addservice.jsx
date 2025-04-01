// /* eslint-disable react/jsx-key */
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Row, Col, Card, Form, Button } from 'react-bootstrap';
// import TextEditor from '../../components/TextEditor';
// import { convertToSlug, decodeHTMLEntities, getEditPageData, getServiceProgramData } from 'utils/helpers';
// import SuccessBanner from 'components/SuccessBanner';

// const EditService = () => {
//   const { userType, slug } = useParams();
//   const [pageData, setPageData] = useState();
//   const [file, setFile] = useState([]);

//   const [formData, setFormData] = useState({
//     serviceData: {},
//     servicePrograms: {},
//     metadata: {}
//   });
//   const [btnDisabled, setBtnDisabled] = useState({
//     serviceData: true,
//     metadata: true,
//     servicePrograms: true
//   });
//   const [showSuccessBanner, setSuccessBanner] = useState({});

//   useEffect(() => {
//     const getData = () => {
//       let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${import.meta.env.VITE_API_URL}services/${userType}/${slug}`,
//         headers: {}
//       };

//       axios
//         .request(config)
//         .then((response) => {
//           console.log('edit data', getServiceProgramData(response.data));
//           setPageData(getServiceProgramData(response.data));
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };

//     getData();
//   }, []);

//   const uploadImage = (event) => {
//     setFile(event.target.files[0]);

//     const serviceFormData = new FormData();

//     if (formData.serviceData.Heading1) {
//       serviceFormData.append('ContentTitle', formData.serviceData.Heading1);
//     }

//     if (formData.serviceData.Description) {
//       serviceFormData.append('Description', formData.serviceData.Description);
//     }

//     serviceFormData.append('Image1', event.target.files[0]);
//     setFormData({
//       serviceData: serviceFormData
//     });
//   };

//   const submitEditData = (contentSlug) => {
//     let data = formData[contentSlug];

//     console.log('data', data);

//     if (contentSlug !== 'serviceData') {
//       data.ContentSlug = contentSlug;
//     }

//     let serviceFormData = new FormData();

//     if (contentSlug === 'serviceData') {
//       if (data.Heading1) {
//         serviceFormData.append('Heading1', data.Heading1);
//       }
//       if (data.Description) {
//         serviceFormData.append('Description', data.Description);
//       }

//       serviceFormData.append('Image1', file);
//     }

//     console.log('service form data', Object.entries(serviceFormData));

//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: `${import.meta.env.VITE_API_URL}editService/${userType}/${slug}/${contentSlug}`,
//       headers: contentSlug === 'serviceData' ? `Content-Type: multipart/form-data` : `Content-Type: application/json`,
//       data: contentSlug === 'serviceData' ? serviceFormData : JSON.stringify(data)
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         setSuccessBanner({ [contentSlug]: true });
//         setTimeout(() => {
//           setSuccessBanner({ [contentSlug]: false });
//         }, 2000);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   console.log('disabled btn', formData);

//   return (
//     <React.Fragment>
//       <Row>
//         <Col sm={6}>
//           <Card>
//             <Card.Header>
//               {showSuccessBanner['serviceData'] && <SuccessBanner />}
//               <Card.Title as="h5">Our Services</Card.Title>
//             </Card.Header>
//             <Card.Body>
//               <Form>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Enter Heading</Form.Label>
//                       <Form.Control
//                         placeholder="Enter heading"
//                         onChange={(e) => {
//                           setFormData({
//                             ...formData,
//                             serviceData: { ...formData.serviceData, Heading1: e.target.value }
//                           });
//                           setBtnDisabled({ serviceData: false });
//                         }}
//                         defaultValue={pageData?.serviceData?.Heading1}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Image</Form.Label>
//                       <Form.Control
//                         placeholder="Enter Title"
//                         type="file"
//                         onChange={(e) => {
//                           uploadImage(e);
//                           setBtnDisabled({ ...btnDisabled, studyDetails: false });
//                         }}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={12}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Enter Description</Form.Label>
//                       <TextEditor
//                         defaultValue={pageData?.serviceData?.Description}
//                         contentSlug="serviceData"
//                         pageData={pageData}
//                         setBtnDisabled={setBtnDisabled}
//                         setFormData={setFormData}
//                         btnDisabled={btnDisabled}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Button
//                   variant="primary"
//                   onClick={() => submitEditData('serviceData')}
//                   disabled={btnDisabled['serviceData']}
//                   className="float-right"
//                 >
//                   Submit
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col sm={6}>
//           <Card>
//             <Card.Header>
//               {showSuccessBanner['metadata'] && <SuccessBanner />}
//               <Card.Title as="h5">Metadata</Card.Title>
//             </Card.Header>
//             <Card.Body>
//               <Form>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Enter Meta Title</Form.Label>
//                       <Form.Control
//                         placeholder="Enter meta title"
//                         onChange={(e) => {
//                           setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.hero, MetaTitle: e.target.value } }));
//                           setBtnDisabled({ metadata: false });
//                         }}
//                         defaultValue={pageData?.pageData?.MetaTitle}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Enter OG Title</Form.Label>
//                       <Form.Control
//                         placeholder="Enter og title"
//                         onChange={(e) => {
//                           setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.hero, OGTitle: e.target.value } }));
//                           setBtnDisabled({ metadata: false });
//                         }}
//                         defaultValue={pageData?.pageData?.OGTitle}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md={12}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Enter Meta Description</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         rows={3}
//                         onChange={(e) => {
//                           setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.hero, MetaDescription: e.target.value } }));
//                           setBtnDisabled({ metadata: false });
//                         }}
//                         defaultValue={pageData?.pageData?.MetaDescription}
//                         placeholder="Enter meta description"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md={12}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Enter OG Description</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         onChange={(e) => {
//                           setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.hero, OGDescription: e.target.value } }));
//                           setBtnDisabled({ metadata: false });
//                         }}
//                         rows={3}
//                         defaultValue={pageData?.pageData?.OGDescription}
//                         placeholder="Enter og description"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Enter Meta Keywords</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         onChange={(e) => {
//                           setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.hero, MetaKeywords: e.target.value } }));
//                           setBtnDisabled({ metadata: false });
//                         }}
//                         rows={3}
//                         defaultValue={pageData?.pageData?.MetaKeywords}
//                         placeholder="Enter meta keywords"
//                       />
//                     </Form.Group>
//                   </Col>
//                   {/* <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Enter OG Keywords</Form.Label>
//                       <Form.Control as="textarea" rows={3} placeholder="Enter og keywords" />
//                     </Form.Group>
//                   </Col> */}
//                 </Row>

//                 <Button
//                   variant="primary"
//                   onClick={() => submitEditData('metadata')}
//                   disabled={btnDisabled['metadata']}
//                   className="float-right"
//                 >
//                   Submit
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col sm={12}>
//           <Card>
//             <Card.Header>
//               {/* {showSuccessBanner['serviceData'] && <SuccessBanner />} */}
//               <Card.Title as="h5">Program Details</Card.Title>
//             </Card.Header>
//             <Card.Body>
//               <Form>
//                 {pageData?.services?.map((ser) => {
//                   return (
//                     <Row>
//                       <Col sm="4">
//                         <Form.Group className="mb-3">
//                           <Form.Label>Enter Title</Form.Label>
//                           <Form.Control
//                             placeholder="Enter title"
//                             onChange={(e) => {
//                               setFormData({
//                                 ...formData,
//                                 servicePrograms: { ...formData.servicePrograms, [ser?.ContentDetailId]: { ContentTitle: e.target.value } }
//                               });
//                               setBtnDisabled({ servicePrograms: false });
//                             }}
//                             defaultValue={ser?.ContentTitle}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col sm="8">
//                         <Form.Group className="mb-3">
//                           <Form.Label>Enter Description</Form.Label>
//                           <TextEditor
//                             defaultValue={ser?.ContentDescription}
//                             contentSlug="servicePrograms"
//                             pageData={ser}
//                             setBtnDisabled={setBtnDisabled}
//                             setFormData={setFormData}
//                             formData={formData}
//                             btnDisabled={btnDisabled}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                   );
//                 })}
//                 <Button
//                   variant="primary"
//                   onClick={() => submitEditData('servicePrograms')}
//                   disabled={btnDisabled['servicePrograms']}
//                   className="float-right"
//                 >
//                   Submit
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </React.Fragment>
//   );
// };

// export default EditService;
