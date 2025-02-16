import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Modal, Form, Col, Row, Button } from 'react-bootstrap'; // Import Row and Button for better layout

import ErrorBadge from './errorBadge';
import './styles.css'; // Import custom CSS

const ScheduleForm = ({ showModal, handleVisibility, reloadPage, props }) => {
  const [studentEmails, setStudentEmails] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState(30); // Set default minimum duration
  const [topic, setTopic] = useState('');
  const [classes, setClasses] = useState([]);
  const [dateValueError, setDateValueError] = useState(false);
  const [emailErrors, setEmailErrors] = useState([]); // Array for individual email errors
  const [badgeMessage, setBadgeMessage] = useState('');
  const { username: userName = '' } = props || {};

  useEffect(() => {
    // Clear email errors on modal open
    setEmailErrors([]);
  }, [showModal]);

  const handleScheduleClass = async () => {
    try {
      const emails = validateEmails(studentEmails); // Validate emails
      if (emails && isEmpty(emailErrors) && studentEmails && scheduledTime && duration && topic) { // Check for any invalid emails
        const response = await axios.post('http://localhost:3001/auth/schedule', {
          scheduledBy: userName,
          studentEmails: emails,
          scheduledTime,
          duration,
          topic,
        });
        handleVisibility(false);
        setClasses([...classes, response.data]);
        reloadPage();
        console.log('Class scheduled successfully:', response.data);
      } 
      else {
        setBadgeMessage('Error: Please fix form errors before scheduling');
      }
    } catch (error) {
      console.error('Error scheduling class:', error);
    }
  };

  const validateEmails = (emails) => {
    setEmailErrors([]);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Improved email validation regex
    const validEmails = [];
    const invalidEmails = [];

    emails.split(',').forEach((email) => {
      email = email.trim(); // Trim whitespace
      if (emailRegex.test(email)) {
        validEmails.push(email);
      } else {
        invalidEmails.push(email);
      }
    });

    if (invalidEmails.length > 0) {
      setEmailErrors(invalidEmails);
      return; // Return an array of invalid email addresses
    } else {
      return validEmails; // Return an array of valid email addresses (modified)
    }
  };

  const isValidScheduledTime = (value) => {
    const now = moment();
    const selectedTime = moment(value);

    if (selectedTime.isBefore(now)) {
      setDateValueError(true);
    } else {
      setDateValueError(false);
      setScheduledTime(value);
    }
  };

  const setVisibility = () => {
    console.log(showModal);
    handleVisibility(!showModal);
  }

  return (
    <Modal show={showModal} onHide={setVisibility} size='sm'>
      <Modal.Header className='modalHeader' closeButton>
        <Modal.Title className='modalTitle'>Schedule Meet</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {badgeMessage && <ErrorBadge message={badgeMessage} />} {/* Display ErrorBadge if there's an error message */}
        <Form className="modalForm">
          <Form.Group as={Row}>
            <Form.Label column sm="4" htmlFor="teacherEmail">Teacher's Email:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="email"
                value={userName}
                id="teacherEmail"
                placeholder={userName}
                readOnly
                required
              />
            </Col>
          </Form.Group>

          {/* Students' Emails */}
          <Form.Group as={Row}>
            <Form.Label column sm="4" htmlFor="studentsEmail">Students' Emails:</Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                value={studentEmails}
                onChange={(e) => setStudentEmails(e.target.value)}
                id="studentsEmail"
                placeholder="Enter students' emails (comma-separated)"
                rows="3"
                required
              />
              {!isEmpty(emailErrors) && (
                <div className="invalid-feedback">
                  {`Invalid emails: ${emailErrors.join(', ')}, please enter valid emails`}
                </div>
              )}
              {!studentEmails && <div className="invalid-feedback">This field is required</div>}
            </Col>
          </Form.Group>

          {/* Schedule Date and Time */}
          <Form.Group as={Row}>
            <Form.Label column sm="4" htmlFor="scheduleDateTime">Schedule Date and Time:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => isValidScheduledTime(e.target.value)}
                id="scheduleDateTime"
                required
              />
              {dateValueError && <div className="invalid-feedback">
                Please choose a valid date and time
              </div>}
              {!scheduledTime && <div className="invalid-feedback">This field is required</div>}
            </Col>
          </Form.Group>

          {/* Set Duration */}
          <Form.Group as={Row}>
            <Form.Label column sm="4" htmlFor="duration">Meeting Duration (in minutes):</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                id="duration"
                value={duration}
                min="30"
                max="300"
                onChange={(e) => setDuration(e.target.value)}
                required
              />
              {!duration && <div className="invalid-feedback">This field is required</div>}
            </Col>
          </Form.Group>

          {/* Set meet topic*/}
          <Form.Group as={Row}>
            <Form.Label column sm="4" htmlFor="meetTopic">Meet Topic:</Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                id="meetTopic"
                placeholder="Enter meet topic"
                rows="3"
                required
              />
              {!topic && <div className="invalid-feedback">This field is required</div>}
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='modalFooter'>
        <Button variant="warning" onClick={handleScheduleClass}>Schedule Meet</Button>
        <Button variant="secondary" onClick={setVisibility}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleForm;
