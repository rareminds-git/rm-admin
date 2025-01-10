import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TextEditor from '../../components/TextEditor';
import { getGeneralEventData, getStudyDetail } from 'utils/helpers';
import SuccessBanner from 'components/SuccessBanner';
import moment from 'moment';

const EditGeneralEvent = () => {
  const {userType, slug } = useParams();
  const [pageData, setPageData] = useState();
  const [formData, setFormData] = useState({
    generalEventData: {},
    generalEventDetails: {},
    metadata: {}
  });
  const [btnDisabled, setBtnDisabled] = useState({
    generalEventData: true,
    generalEventDetails: true,
    metadata: true
  });

  const [showSuccessBanner, setSuccessBanner] = useState({});

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}generalEvents/${slug}`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          console.log('edit data', response.data);
          setPageData(getGeneralEventData(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  const [file, setFile] = useState([]);

  const uploadImage = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    const generalEventFormData = new FormData();

    if (formData.generalEventData.Heading1) {
      generalEventFormData.append('Heading1', formData.generalEventData.Heading1);
    }
    if (formData.generalEventData.Heading2) {
      generalEventFormData.append('Heading2', formData.generalEventData.Heading2);
    }

    generalEventFormData.append('Image1', event.target.files[0]);
    setFormData({
      generalEventData: generalEventFormData
    });
  };

  const submitEditData = (contentSlug) => {
    let data = formData[contentSlug];
    console.log('form data', file);

    data.ContentSlug = contentSlug;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}editGeneralEvent/${slug}/${contentSlug}`,
      headers: contentSlug === 'generalEventData' ? `Content-Type: multipart/form-data` : `Content-Type: application/json`,
      data: contentSlug === 'generalEventData' ? formData[contentSlug] : JSON.stringify(data)
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSuccessBanner({ [contentSlug]: true });
        setTimeout(() => {
          setSuccessBanner({ [contentSlug]: false });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log('form data', formData);

  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Header>
              {showSuccessBanner['generalEventData'] && <SuccessBanner />}
              <Card.Title as="h5">General Event</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Heading</Form.Label>
                      <Form.Control
                        placeholder="Enter heading"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            generalEventData: { ...formData.generalEventData, Heading1: e.target.value }
                          });
                          setBtnDisabled({ generalEventData: false });
                        }}
                        defaultValue={pageData?.pageData?.Heading1}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Short Description</Form.Label>
                      <Form.Control
                        placeholder="Enter Short Description"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            generalEventData: { ...formData.generalEventData, Heading2: e.target.value }
                          });
                          setBtnDisabled({ generalEventData: false });
                        }}
                        as="textarea"
                        rows={4}
                        defaultValue={pageData?.pageData?.Heading2}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => {
                          uploadImage(e);
                          setBtnDisabled({ ...btnDisabled, generalEventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Submitted Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={
                          formData.generalEventData.CreatedOn
                            ? moment(formData.generalEventData.CreatedOn).format('YYYY-MM-DD')
                            : moment(pageData?.pageData?.CreatedOn).format('YYYY-MM-DD')
                        }
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            generalEventData: { ...formData.generalEventData, CreatedOn: moment(e.target.value).format('YYYY-MM-DD HH:mm:ss') }
                          });
                          setBtnDisabled({ generalEventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  onClick={() => submitEditData('generalEventData')}
                  disabled={btnDisabled['generalEventData']}
                  className="float-right"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6}>
          <Card>
            <Card.Header>
              {showSuccessBanner['metadata'] && <SuccessBanner />}
              <Card.Title as="h5">Metadata</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Meta Title</Form.Label>
                      <Form.Control
                        placeholder="Enter meta title"
                        onChange={(e) => {
                          setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.metadata, MetaTitle: e.target.value } }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pageData?.pageData?.MetaTitle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OG Title</Form.Label>
                      <Form.Control
                        placeholder="Enter og title"
                        onChange={(e) => {
                          setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.metadata, OGTitle: e.target.value } }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pageData?.pageData?.OGTitle}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Meta Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            metadata: { ...prevState.metadata, MetaDescription: e.target.value }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pageData?.pageData?.MetaDescription}
                        placeholder="Enter meta description"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OG Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            metadata: { ...prevState.metadata, OGDescription: e.target.value }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        rows={3}
                        defaultValue={pageData?.generalEventData?.OGDescription}
                        placeholder="Enter og description"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Meta Keywords</Form.Label>
                      <Form.Control
                        as="textarea"
                        onChange={(e) => {
                          setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.metadata, MetaKeywords: e.target.value } }));
                          setBtnDisabled({ metadata: false });
                        }}
                        rows={3}
                        defaultValue={pageData?.pageData?.MetaKeywords}
                        placeholder="Enter meta keywords"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  onClick={() => submitEditData('metadata')}
                  disabled={btnDisabled['metadata']}
                  className="float-right"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12}>
          <Card>
            <Card.Header>
              {showSuccessBanner['generalEventDetails'] && <SuccessBanner />}
              <Card.Title as="h5">General Event </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Title</Form.Label>
                      <Form.Control
                        placeholder="Enter Title"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            generalEventDetails: {
                              ...prevState.generalEventDetails,
                              ContentTitle: e.target.value,
                              ContentDetailId: pageData?.generalEventDetails?.ContentDetailId
                            }
                          }));
                          setBtnDisabled({ ...btnDisabled, generalEventDetails: false });
                        }}
                        defaultValue={pageData?.generalEventDetails?.ContentTitle}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12">
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Description</Form.Label>
                      <TextEditor
                        defaultValue={pageData ? pageData?.generalEventDetails?.ContentDescription : ''}
                        contentSlug="generalEventDetails"
                        pageData={pageData}
                        setBtnDisabled={setBtnDisabled}
                        setFormData={setFormData}
                        formData={formData}
                        btnDisabled={btnDisabled}
                      />
                    </Form.Group>
                  </Col>
                 </Row>
                <Button
                  variant="primary"
                  onClick={() => submitEditData('generalEventDetails')}
                  disabled={btnDisabled['generalEventDetails']}
                  className="float-right"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EditGeneralEvent;
