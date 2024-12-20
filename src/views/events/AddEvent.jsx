import axios from 'axios';
import TextEditor from 'components/TextEditor';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  //   const [events, setEventsData] = useState([]);
  const [scheduleRowCount, setScheduleRowCount] = useState(1);
  const [agendaRowCount, setAgendaRowCount] = useState(1);
  const [formData, setFormData] = useState({
    eventData: {},
    eventSchedule: [],
    eventAgenda: []
  });
  const [btnDisabled, setBtnDisabled] = useState({
    eventData: true
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
      url: `${import.meta.env.VITE_API_URL}addEvent`,
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
                        placeholder="Enter event venue"
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
              {[...Array(scheduleRowCount).keys()].map((row, index) => {
                return (
                  <Row key={index}>
                    <Col sm="5">
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
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

                            setBtnDisabled({ eventSchedule: false });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="2">
                      <button className="btn btn-success mt-4" onClick={() => setScheduleRowCount(scheduleRowCount + 1)}>
                        Add
                      </button>
                    </Col>
                  </Row>
                );
              })}
            </Card.Body>

            <Card.Header>
              <Card.Title as="h5">Agenda</Card.Title>
            </Card.Header>
            <Card.Body>
              {[...Array(agendaRowCount).keys()].map((row, index) => {
                return (
                  <Row key={index}>
                    <Col sm="3">
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
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
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="2">
                      <button className="btn btn-success mt-4" onClick={() => setAgendaRowCount(agendaRowCount + 1)}>
                        Add
                      </button>
                    </Col>
                  </Row>
                );
              })}
              <Button variant="primary" onClick={() => submitEditData()} className="float-right">
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddEvent;
