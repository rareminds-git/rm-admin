import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TextEditor from '../../components/TextEditor';
import { getBlogData, getStudyDetail } from 'utils/helpers';
import SuccessBanner from 'components/SuccessBanner';
import moment from 'moment';

const EditBlog = () => {
  const { userType, slug } = useParams();
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

  const [showSuccessBanner, setSuccessBanner] = useState({});

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}blogs/${slug}`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          console.log('edit data', response.data);
          setPageData(getBlogData(response.data));
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
    const blogFormData = new FormData();

    if (formData.blogData.Heading1) {
      blogFormData.append('Heading1', formData.blogData.Heading1);
    }
    if (formData.blogData.Heading2) {
      blogFormData.append('Heading2', formData.blogData.Heading2);
    }

    blogFormData.append('Image1', event.target.files[0]);
    setFormData({
      blogData: blogFormData
    });
  };

  const submitEditData = (contentSlug) => {
    let data = formData[contentSlug];
    console.log('form data', file);

    data.ContentSlug = contentSlug;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}editBlog/${slug}/${contentSlug}`,
      headers: contentSlug === 'blogData' ? `Content-Type: multipart/form-data` : `Content-Type: application/json`,
      data: contentSlug === 'blogData' ? formData[contentSlug] : JSON.stringify(data)
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
              {showSuccessBanner['blogData'] && <SuccessBanner />}
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
                            blogData: { ...formData.blogData, Heading1: e.target.value }
                          });
                          setBtnDisabled({ blogData: false });
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
                            blogData: { ...formData.blogData, Heading2: e.target.value }
                          });
                          setBtnDisabled({ blogData: false });
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
                          setBtnDisabled({ ...btnDisabled, blogData: false });
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
                          formData.blogData.CreatedOn
                            ? moment(formData.blogData.CreatedOn).format('YYYY-MM-DD')
                            : moment(pageData?.pageData?.CreatedOn).format('YYYY-MM-DD')
                        }
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
              {showSuccessBanner['blogDetails'] && <SuccessBanner />}
              <Card.Title as="h5">Blog</Card.Title>
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
                            blogDetails: {
                              ...prevState.blogDetails,
                              ContentTitle: e.target.value,
                              ContentDetailId: pageData?.blogDetails?.ContentDetailId
                            }
                          }));
                          setBtnDisabled({ ...btnDisabled, blogDetails: false });
                        }}
                        defaultValue={pageData?.blogDetails?.ContentTitle}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm="12">
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Description</Form.Label>
                      <TextEditor
                        defaultValue={pageData ? pageData?.blogDetails?.ContentDescription : ''}
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

                <Button
                  variant="primary"
                  onClick={() => submitEditData('blogDetails')}
                  disabled={btnDisabled['blogDetails']}
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
