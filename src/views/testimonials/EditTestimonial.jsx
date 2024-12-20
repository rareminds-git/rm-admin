import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TextEditor from '../../components/TextEditor';
import { getBlogData } from 'utils/helpers';
import SuccessBanner from 'components/SuccessBanner';
import moment from 'moment';

const EditTestimonial = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [pageData, setPageData] = useState();
  const [formData, setFormData] = useState({
    testimonialDetails: {}
  });
  const [btnDisabled, setBtnDisabled] = useState({
    testimonialDetails: {}
  });

  const [showSuccessBanner, setSuccessBanner] = useState(false);

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}testimonials/${id}`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          console.log('edit data', response.data);
          setPageData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getCategories = () => {
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
    getCategories();
  }, []);

  const [file, setFile] = useState([]);

  const uploadImage = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    const testomonialFormData = new FormData();

    if (formData.testimonialDetails.ContentTitle) {
      testomonialFormData.append('ContentTitle', formData.testimonialDetails.ContentTitle);
    }

    if (formData.testimonialDetails.ContentDescription) {
      testomonialFormData.append('ContentDescription', formData.testimonialDetails.ContentDescription);
    }

    blogFormData.append('ContentImage', event.target.files[0]);
    setFormData({
      testimonialData: testomonialFormData
    });
  };

  const submitEditData = () => {
    console.log('form data', file);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}editTestimonial/${id}`,
      headers: `Content-Type: multipart/form-data`,
      data: formData
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSuccessBanner(true);
        setTimeout(() => {
          setSuccessBanner(false);
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
        <Col sm={12}>
          <Card>
            <Card.Header>
              {showSuccessBanner && <SuccessBanner />}
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
                        defaultValue={pageData?.testimonialDetails[0].ContentTitle}
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
                        defaultValue={pageData?.testimonialDetails[0].ContentDescription}
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
                            <option
                              value={ele.ContentId}
                              key={ele.ContentId}
                              selected={ele.ContentId === pageData?.testimonialDetails[0].ContentId}
                            >
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

export default EditTestimonial;
