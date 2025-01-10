/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Modal, Alert } from 'react-bootstrap';
import moment from 'moment';

const EditGallery = () => {
  const [formData, setFormData] = useState({
    eventDate: '',
    university: '',
    year: '',
    semester: '',
    course: '',
    eventName: '' // Default value to avoid NULL
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);  // For success modal
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('danger');  // For alert messages
  const navigate = useNavigate();

  const currentYear = moment().year(); // Get the current year
  const startYear = 2021; // The year to start the dropdown from
  const yearOptions = [];
  for (let i = startYear; i <= currentYear; i++) {
    yearOptions.push(i);
  }

  const semesterOptions = [4, 5, 6]; // Predefined semester options

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selectedFile);

      validateForm();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateForm();
  };

  const validateForm = () => {
    const isValidDate = formData.eventDate && moment(formData.eventDate).isBefore(moment().add(1, 'days'));  // Ensure date is today or in the future
    const isValidYear = formData.year && /^[1-9]\d*$/.test(formData.year);  // Year must be a valid number (positive integer)
    const isValidSemester = formData.semester && /^[1-9]$/.test(formData.semester);  // Semester should be a single digit
    const isValidUniversity = formData.university && formData.university.trim() !== '';
    const isValidCourse = formData.course && formData.course.trim() !== '';
    const isValidFile = file;

    setIsSubmitDisabled(!(isValidDate && isValidYear && isValidSemester && isValidUniversity && isValidCourse && isValidFile));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    // Map form data to keys expected by backend
    const formattedDate = moment(formData.eventDate).format('YYYY-MM-DD');
  data.append('event_date', formattedDate);
  data.append('university', formData.university);
  data.append('year', formData.year);
  data.append('semester', formData.semester);
  data.append('course', formData.course);
  data.append('eventName', formData.eventName || 'N/A'); // Optional field fallback

  if (file) {
    data.append('image', file);
  } else {
    setAlertMessage('Please upload an image.');
    setAlertType('danger');
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}addGallery`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Response:', response.data);
    setAlertMessage('Gallery successfully added!');
    setAlertType('success');
    setShowModal(true);
  } catch (error) {
    console.error('Error uploading gallery data:', error);
    setAlertMessage('Error uploading gallery data. Please try again.');
    setAlertType('danger');
  }
};

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/gallery'); // Redirect after closing modal
  };

  return (
    <Row>
      <Col sm={12}>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Add New Gallery</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Event Image</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
                {imagePreview && (
                  <div style={{ marginTop: '20px' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: '100%',
                        maxWidth: '300px',
                        height: 'auto',
                        border: '2px solid #ccc',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                )}
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      max={moment().format('YYYY-MM-DD')}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                    />
                    {!formData.eventDate && <Alert variant="danger">Please select a valid date (today or future date).</Alert>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>University</Form.Label>
                    <Form.Control placeholder="Enter University Name" onChange={(e) => handleInputChange('university', e.target.value)} />
                    {!formData.university && <Alert variant="danger">University name is required.</Alert>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control as="select" value={formData.year} onChange={(e) => handleInputChange('year', e.target.value)}>
                      <option value="">Select Year</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                    {!formData.year || (!/^[1-9]\d*$/.test(formData.year) && <Alert variant="danger">Please enter a valid year (positive integer).</Alert>)}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Semester</Form.Label>
                    <Form.Control as="select" value={formData.semester} onChange={(e) => handleInputChange('semester', e.target.value)}>
                      <option value="">Select Semester</option>
                      {semesterOptions.map((semester) => (
                        <option key={semester} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </Form.Control>
                    {!formData.semester || 
                      (!/^[1-9]$/.test(formData.semester) && <Alert variant="danger">Semester must be a single digit.</Alert>)
                    }
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label>Course</Form.Label>
                <Form.Control placeholder="Enter Course" onChange={(e) => handleInputChange('course', e.target.value)} />
                {!formData.course && (
                  <Alert variant="danger">Course is required.</Alert>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Event Name (Optional)</Form.Label>
                <Form.Control placeholder="Enter Event Name" onChange={(e) => handleInputChange('eventName', e.target.value)} />
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitDisabled} style={{ marginTop: '20px' }}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default EditGallery;
