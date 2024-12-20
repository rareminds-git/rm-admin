import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import SuccessBanner from 'components/SuccessBanner';

const AddTestimonial = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    testimonialData: {},
    testimonialDetails: {}
  });
  const [btnDisabled, setBtnDisabled] = useState({
    testimonialData: true,
    testimonialDetails: true
  });

  const [file, setFile] = useState([]);

  const navigate = useNavigate();

  const uploadImage = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}testimonialCategories`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          console.log('response', response.data);
          setCategories(response.data.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  const submitEditData = () => {
    let data = new FormData();
    for (var key in formData) {
      data.append(key, JSON.stringify(formData[key]));
    }
    data.append('ContentImage', file);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}addTestimonial`,
      headers: `Content-Type: multipart/form-data`,
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        navigate('/testimonials');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log('form data', categories);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Testimonial</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Author Details</Form.Label>
                      <Form.Control
                        placeholder="Enter author details"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            testimonialDetails: { ...formData.testimonialDetails, ContentTitle: e.target.value }
                          });

                          setBtnDisabled({ testimonialData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Description</Form.Label>
                      <Form.Control
                        placeholder="Enter Description"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            testimonialDetails: { ...formData.testimonialDetails, ContentDescription: e.target.value }
                          });
                          setBtnDisabled({ testimonialDetails: false });
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
                          setBtnDisabled({ ...btnDisabled, testimonialDetails: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            testimonialDetails: { ...formData.testimonialDetails, ContentId: e.target.value }
                          });
                          setBtnDisabled({ testimonialDetails: false });
                        }}
                      >
                        <option disabled selected>
                          Select Category
                        </option>
                        {categories?.map((ele) => {
                          return (
                            <option value={ele.ContentId} key={ele.ContentId}>
                              {ele.Heading1}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  onClick={() => submitEditData('testimonialDetails')}
                  disabled={btnDisabled['testimonialDetails']}
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

export default AddTestimonial;
