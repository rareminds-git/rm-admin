import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TextEditor from '../../components/TextEditor';
import SuccessBanner from 'components/SuccessBanner';
import moment from 'moment';

const EditBlog = () => {
  const [pageData, setPageData] = useState();
  const [formData, setFormData] = useState({
    blogData: {},
    blogDetails: {},
    metadata: {}
  });
  const [btnDisabled, setBtnDisabled] = useState({
    blogData: true,
    blogDetails: true,
    metadata: true
  });

  const [file, setFile] = useState([]);

  const navigate = useNavigate();

  const uploadImage = (event) => {
    setFile(event.target.files[0]);
  };

  const submitEditData = () => {
    let data = new FormData();
    for (var key in formData) {
      data.append(key, JSON.stringify(formData[key]));
    }
    data.append('Image1', file);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}addBlog`,
      headers: `Content-Type: multipart/form-data`,
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        navigate('/blogs');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log('form data', formData);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Blog</Card.Title>
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
                            blogData: { ...formData.blogData, Heading1: e.target.value },
                            blogDetails: { ...formData.blogDetails, ContentTitle: e.target.value }
                          });

                          setBtnDisabled({ blogData: false });
                        }}
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
                            blogData: { ...formData.blogData, Heading2: e.target.value }
                          });
                          setBtnDisabled({ blogData: false });
                        }}
                        as="textarea"
                        rows={4}
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
                          setBtnDisabled({ ...btnDisabled, blogData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            blogData: { ...formData.blogData, CreatedOn: moment(e.target.value).format('YYYY-MM-DD HH:mm:ss') }
                          });
                          setBtnDisabled({ blogData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12">
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Description</Form.Label>
                      <TextEditor
                        defaultValue={''}
                        contentSlug="blogDetails"
                        pageData={pageData}
                        setBtnDisabled={setBtnDisabled}
                        setFormData={setFormData}
                        formData={formData}
                        btnDisabled={btnDisabled}
                      />
                    </Form.Group>
                  </Col>
                </Row>

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
                  onClick={() => submitEditData('blogData')}
                  disabled={btnDisabled['blogData']}
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

export default EditBlog;