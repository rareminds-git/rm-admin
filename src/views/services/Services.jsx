import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import TextEditor from '../../components/TextEditor';
import { useParams } from 'react-router-dom';
import { getServicePageData } from 'utils/helpers';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const { slug } = useParams();
  const [pagesData, setPagesData] = useState();
  const [formData, setFormData] = useState({
    services: {},
    metadata: {}
  });
  const [btnDisabled, setBtnDisabled] = useState({
    services: true,
    metadata: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}services/${slug}`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          setPagesData(getServicePageData(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, [slug]);

  const submitEditData = (contentSlug) => {
    let data = formData[contentSlug];

    data.ContentSlug = contentSlug;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}services/edit/${slug}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  console.log('page data', pagesData);

  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Our Services</Card.Title>
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
                          setFormData((prevState) => ({
                            ...prevState,
                            services: { ...prevState.services, Heading1: e.target.value }
                          }));
                          setBtnDisabled({ ...btnDisabled, services: false });
                        }}
                        defaultValue={pagesData?.pageData?.Heading1}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Description</Form.Label>
                      <TextEditor
                        defaultValue={pagesData?.pageData?.Description}
                        contentSlug="services"
                        pageData={pagesData}
                        setBtnDisabled={setBtnDisabled}
                        setFormData={setFormData}
                        btnDisabled={btnDisabled}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  onClick={() => submitEditData('services')}
                  disabled={btnDisabled['services']}
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
                          setFormData((prevState) => ({
                            ...prevState,
                            metadata: { ...prevState.services, MetaTitle: e.target.value, ContentId: pagesData.pageData.ContentId }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pagesData?.pageData?.MetaTitle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OG Title</Form.Label>
                      <Form.Control
                        placeholder="Enter og title"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            metadata: { ...prevState.services, OGTitle: e.target.value, ContentId: pagesData.pageData.ContentId }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pagesData?.pageData?.OGTitle}
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
                            metadata: { ...prevState.services, MetaDescription: e.target.value, ContentId: pagesData.pageData.ContentId }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pagesData?.pageData?.MetaDescription}
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
                            metadata: { ...prevState.services, OGDescription: e.target.value, ContentId: pagesData.pageData.ContentId }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        rows={3}
                        defaultValue={pagesData?.pageData?.OGDescription}
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
                          setFormData((prevState) => ({
                            ...prevState,
                            metadata: { ...prevState.services, MetaKeywords: e.target.value, ContentId: pagesData.pageData.ContentId }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        rows={3}
                        defaultValue={pagesData?.pageData?.MetaKeywords}
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
        <Col>
          <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service Name</th>
                    <th>Service Slug</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagesData?.serviceData?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.Heading1}</td>
                        <td>{data.ContentSlug}</td>
                        <td>
                        <button onClick={() => navigate(`/edit/${data.ContentSlug}`)} className="btn btn-primary">
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Services;
