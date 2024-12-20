import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TextEditor from '../../components/TextEditor';
import { getStudyDetail } from 'utils/helpers';
import SuccessBanner from 'components/SuccessBanner';

const EditStudy = () => {
  const { userType, slug } = useParams();
  const [pageData, setPageData] = useState();
  const [formData, setFormData] = useState({
    studyData: {},
    studyDetails: {},
    metadata: {}
  });
  const [btnDisabled, setBtnDisabled] = useState({
    studyData: true,
    metadata: true,
    studyDetails: true
  });

  const [showSuccessBanner, setSuccessBanner] = useState({});

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}case-studies/${userType}/case-studies/${slug}`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          console.log('edit data', getStudyDetail(response.data));
          setPageData(getStudyDetail(response.data));
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
    const studyDetailFormData = new FormData();
    if (formData.ContentTitle) {
      studyDetailFormData.append('ContentTitle', formData.ContentTitle);
    }
    if (formData.ContentDescription) {
      studyDetailFormData.append('ContentDescription', formData.ContentDescription);
    }
    if (formData.ContentDetailId) {
      studyDetailFormData.append('ContentDescription', formData.ContentDetailId);
    } else {
      studyDetailFormData.append('ContentDetailId', pageData?.studyDetails?.ContentDetailId);
    }
    studyDetailFormData.append('ContentImage', event.target.files[0]);
    setFormData({
      studyDetails: studyDetailFormData
    });
  };

  const submitEditData = (contentSlug) => {
    let data = formData[contentSlug];
    console.log('form data', formData, contentSlug);
    if (contentSlug !== 'studyDetails') {
      data.ContentSlug = contentSlug;
    }

    let studyDetailFormData = new FormData();

    if (contentSlug === 'studyDetails') {
      if (!file) {
        if (data.ContentTitle) {
          studyDetailFormData.append('ContentTitle', data.ContentTitle);
        }
        if (formData.ContentDescription) {
          studyDetailFormData.append('ContentDescription', data.ContentDescription);
        }
        studyDetailFormData.append('ContentSlug', contentSlug);
        studyDetailFormData.append('ContentDetailId', pageData?.studyDetails?.ContentDetailId);
      } else {
        console.log('form data', formData);
        if (data.ContentTitle) {
          studyDetailFormData.append('ContentTitle', data.ContentTitle);
        }
        if (data.ContentDescription) {
          studyDetailFormData.append('ContentDescription', data.ContentDescription);
        }
        studyDetailFormData.append('ContentSlug', contentSlug);
        studyDetailFormData.append('ContentDetailId', pageData?.studyDetails?.ContentDetailId);
      }
    }

    console.log('studydetaildata', studyDetailFormData);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}editStudy/${userType}/${slug}/${contentSlug}`,
      headers: contentSlug === 'studyDetails' ? `Content-Type: multipart/form-data` : `Content-Type: application/json`,
      data: contentSlug === 'studyDetails' ? studyDetailFormData : JSON.stringify(data)
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
              {showSuccessBanner['studyData'] && <SuccessBanner />}
              <Card.Title as="h5">Case Study</Card.Title>
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
                            studyData: { ...formData.studyData, Heading1: e.target.value }
                          });
                          setBtnDisabled({ studyData: false });
                        }}
                        defaultValue={pageData?.pageData?.Heading1}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Description</Form.Label>
                      <Form.Control
                        placeholder="Enter heading"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            studyData: { ...formData.studyData, Heading2: e.target.value }
                          });
                          setBtnDisabled({ studyData: false });
                        }}
                        as="textarea"
                        rows={4}
                        defaultValue={pageData?.pageData?.Heading2}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  onClick={() => submitEditData('studyData')}
                  disabled={btnDisabled['studyData']}
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
                        defaultValue={pageData?.pageData?.OGDescription}
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
                  {/* <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OG Keywords</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter og keywords" />
                    </Form.Group>
                  </Col> */}
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
              {showSuccessBanner['studyDetails'] && <SuccessBanner />}
              <Card.Title as="h5">Case Study Details</Card.Title>
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
                            studyDetails: {
                              ...prevState.studyDetails,
                              ContentTitle: e.target.value,
                              ContentDetailId: pageData?.studyDetails?.ContentDetailId
                            }
                          }));
                          setBtnDisabled({ ...btnDisabled, studyDetails: false });
                        }}
                        defaultValue={pageData?.studyDetails?.ContentTitle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        placeholder="Enter Title"
                        type="file"
                        onChange={(e) => {
                          uploadImage(e);
                          setBtnDisabled({ ...btnDisabled, studyDetails: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12">
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Description</Form.Label>
                      <TextEditor
                        defaultValue={pageData?.studyDetails?.ContentDescription}
                        contentSlug="studyDetails"
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
                  onClick={() => submitEditData('studyDetails')}
                  disabled={btnDisabled['studyDetails']}
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

export default EditStudy;
