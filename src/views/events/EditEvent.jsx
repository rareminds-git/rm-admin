import axios from 'axios';
import TextEditor from 'components/TextEditor';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState([]);
  const [formData, setFormData] = useState({
    eventData: {},
    eventSchedule: [],
    eventAgenda: []
  });
  const [btnDisabled, setBtnDisabled] = useState({
    eventData: true
  });

  const [eventSchedule, setEventSchedule] = useState([]);
  const [eventAgenda, setEventAgenda] = useState([]);

  const handleAddSchedule = () => {
    setEventSchedule([...eventSchedule, { Date: '', Time: '', Description: '' }]);
  };

  const handleAddAgenda = () => {
    setEventAgenda([...eventAgenda, { Heading: '', Description: '' }]);
  };

  const handleDeleteSchedule = (index) => {
    setEventSchedule(eventSchedule.filter((item, i) => i !== index));
  };

  const handleDeleteAgenda = (index) => {
    setEventAgenda(eventAgenda.filter((item, i) => i !== index));
  };

  const [fileSize, setFileSize] = useState(0);
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
        url: `${import.meta.env.VITE_API_URL}events/${id}`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          console.log('edit data', response.data);
          setPageData(response.data);
          setFormData(response.data);
          setEventSchedule(response.data.eventSchedule);
          setEventAgenda(response.data.eventAgenda);
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
    data.append('Image1', file);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}editEvent/${id}`,
      headers: `Content-Type: multipart/form-data`,
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        navigate('/events');
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
              <Card.Title as="h5">Event</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Event Title</Form.Label>
                      <Form.Control
                        placeholder="Enter event title"
                        defaultValue={pageData?.eventData && pageData?.eventData[0]?.Heading1}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            eventData: { ...formData.eventData, Heading1: e.target.value }
                          });

                          setBtnDisabled({ eventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Event SubTitle</Form.Label>
                      <Form.Control
                        placeholder="Enter event subtitle"
                        defaultValue={pageData?.eventData && pageData?.eventData[0]?.Heading2}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            eventData: { ...formData.eventData, Heading2: e.target.value }
                          });

                          setBtnDisabled({ eventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Event Category</Form.Label>
                      <Form.Control
                        placeholder="Enter event category"
                        defaultValue={pageData?.eventData && pageData?.eventData[0]?.SubHeading1}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            eventData: { ...formData.eventData, SubHeading1: e.target.value }
                          });

                          setBtnDisabled({ eventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Organiser Name</Form.Label>
                      <Form.Control
                        placeholder="Enter organiser name"
                        defaultValue={pageData?.eventData && pageData?.eventData[0]?.SubHeading2}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            eventData: { ...formData.eventData, SubHeading2: e.target.value }
                          });

                          setBtnDisabled({ eventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Event Date</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={moment(pageData?.eventData && pageData?.eventData[0]?.EventDate).format('YYYY-MM-DD')}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            eventData: { ...formData.eventData, EventDate: moment(e.target.value).format('YYYY-MM-DD HH:mm:ss') }
                          });
                          setBtnDisabled({ eventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Event Venue</Form.Label>
                      <Form.Control
                        placeholder="Enter event venue"
                        defaultValue={pageData?.eventData && pageData?.eventData[0]?.Address1}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            eventData: { ...formData.eventData, Address1: e.target.value }
                          });

                          setBtnDisabled({ eventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Description</Form.Label>
                      <Form.Control
                        placeholder="Enter Description"
                        defaultValue={pageData?.eventData && pageData?.eventData[0]?.Description}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            eventData: { ...formData.eventData, Description: e.target.value }
                          });
                          setBtnDisabled({ eventData: false });
                        }}
                        as="textarea"
                        rows={4}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Event Image</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => {
                          uploadImage(e);
                          setBtnDisabled({ ...btnDisabled, eventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Event Slug</Form.Label>
                      <Form.Control
                        placeholder="Enter event slug"
                        defaultValue={pageData?.eventData && pageData?.eventData[0]?.ContentSlug}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            eventData: { ...formData.eventData, ContentSlug: e.target.value }
                          });

                          setBtnDisabled({ eventData: false });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Registration Open</Form.Label>
                      {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="Yes"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                eventData: { ...formData.eventData, Status: 1 }
                              });
                            }}
                            name="group1"
                            checked={pageData?.eventData && pageData?.eventData[0]?.Status === 1 ? true : false}
                            type={type}
                            id={`inline-${type}-1`}
                          />
                          <Form.Check
                            inline
                            label="No"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                eventData: { ...formData.eventData, Status: 0 }
                              });
                            }}
                            checked={pageData?.eventData && pageData?.eventData[0]?.Status === 0 ? true : false}
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>

            <Card.Header>
              <Card.Title as="h5">Event Schedule</Card.Title>
            </Card.Header>
            <Card.Body>
              {eventSchedule?.map((row, index) => {
                return (
                  <Row key={index}>
                    <Col sm="5">
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          defaultValue={moment(row.Date).format('YYYY-MM-DD')}
                          onChange={(e) => {
                            let eventSchedule = [];
                            if (formData.eventSchedule.length > 0) {
                              eventSchedule = formData.eventSchedule;
                              if (!eventSchedule[index]) {
                                eventSchedule[index] = {};
                              }
                              eventSchedule[index]['Date'] = moment(e.target.value).format('YYYY-MM-DD HH:mm:ss');
                              setFormData({ ...formData, eventSchedule: eventSchedule });
                            } else {
                              eventSchedule.push({ Date: moment(e.target.value).format('YYYY-MM-DD HH:mm:ss') });
                              setFormData({ ...formData, eventSchedule: eventSchedule });
                            }

                            setBtnDisabled({ eventSchedule: false });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="5">
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={row.Title}
                          onChange={(e) => {
                            let eventSchedule = [];
                            if (formData.eventSchedule.length > 0) {
                              eventSchedule = formData.eventSchedule;
                              if (!eventSchedule[index]) {
                                eventSchedule[index] = {};
                              }
                              eventSchedule[index]['Title'] = e.target.value;
                              setFormData({ ...formData, eventSchedule: eventSchedule });
                            } else {
                              eventSchedule.push({ Title: e.target.value });
                              setFormData({ ...formData, eventSchedule: eventSchedule });
                            }
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="2">
                      <button
                        className="btn btn-danger mt-4"
                        onClick={() => {
                          let eventSchedule = [...formData.eventSchedule];
                          eventSchedule.splice(index, 1);
                          setFormData({ ...formData, eventSchedule });
                          handleDeleteSchedule(index);
                        }}
                      >
                        Delete
                      </button>
                    </Col>
                  </Row>
                );
              })}
              <button
                className="btn btn-success mt-4"
                onClick={() => {
                  let eventSchedule = [...formData.eventSchedule];
                  eventSchedule.push({ Date: '', Title: '' });
                  setFormData({ ...formData, eventSchedule });
                  handleAddSchedule();
                }}
              >
                Add Schedule Item
              </button>
            </Card.Body>

            <Card.Header>
              <Card.Title as="h5">Agenda</Card.Title>
            </Card.Header>
            <Card.Body>
              {eventAgenda?.map((row, index) => {
                return (
                  <Row key={index}>
                    <Col sm="3">
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={row.Title}
                          onChange={(e) => {
                            let eventAgenda = [];
                            if (formData.eventAgenda.length > 0) {
                              eventAgenda = formData.eventAgenda;
                              if (!eventAgenda[index]) {
                                eventAgenda[index] = {};
                              }
                              eventAgenda[index]['Title'] = e.target.value;
                              setFormData({ ...formData, eventAgenda: eventAgenda });
                            } else {
                              eventAgenda.push({ Title: e.target.value });
                              setFormData({ ...formData, eventAgenda: eventAgenda });
                            }
                            setBtnDisabled({ eventAgenda: false });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="3">
                      <Form.Group className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={row.Time}
                          onChange={(e) => {
                            let eventAgenda = [];
                            if (formData.eventAgenda.length > 0) {
                              eventAgenda = formData.eventAgenda;
                              if (!eventAgenda[index]) {
                                eventAgenda[index] = {};
                              }
                              eventAgenda[index]['Time'] = e.target.value;
                              setFormData({ ...formData, eventAgenda: eventAgenda });
                            } else {
                              eventAgenda.push({ Time: e.target.value });
                              setFormData({ ...formData, eventAgenda: eventAgenda });
                            }
                            setBtnDisabled({ eventAgenda: false });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="4">
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <TextEditor
                          contentSlug="eventAgenda"
                          pageData={{}}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          index={index}
                          formData={formData}
                          defaultValue={row.Description}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="2">
                      <button
                        className="btn btn-danger mt-4"
                        onClick={() => {
                          let eventAgenda = [...formData.eventAgenda];
                          eventAgenda.splice(index, 1);
                          setFormData({ ...formData, eventAgenda });
                          handleDeleteAgenda(index);
                        }}
                      >
                        Delete
                      </button>
                    </Col>
                  </Row>
                );
              })}
              <button
                className="btn btn-success mt-4"
                onClick={() => {
                  let eventAgenda = [...formData.eventAgenda];
                  eventAgenda.push({ Title: '', Time: '', Description: '' });
                  setFormData({ ...formData, eventAgenda });
                  handleAddAgenda();
                }}
              >
                Add Agenda Item
              </button>
              <Button variant="primary" onClick={() => submitEditData()} className="float-right mt-4">
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EditEvent;
