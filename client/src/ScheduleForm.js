import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Modal, Form } from 'react-bootstrap';

import './styles.css';

const ScheduleForm = ({ showModal, handleVisibility, reloadPage, props }) => {
  const [studentEmails, setStudentEmails] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [topic, setTopic] = useState('');
  const [classes, setClasses] = useState([]);
  const [dateValueError, setDateValueError] = useState(false);
  const { username: userName = "" } = props||{};

  const onDataUpdate = {};

  const handleScheduleClass = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/schedule', {
        scheduledBy:userName,
        studentEmails: studentEmails.split(',').map((email) => email.trim()),
        scheduledTime,
        duration,
        topic
      });
      handleVisibility(false);
      setClasses([...classes, response.data]);
      // onDataUpdate(response.data);
      reloadPage();
      console.log('Class scheduled successfully:', response.data);
    } catch (error) {
      console.error('Error scheduling class:', error);
    }
  };

  const isValidScheduledTime = (value) => {
    console.log(value);
    const today = moment();
    setScheduledTime(value);

  }

  const setVisibility = () => {
    console.log(showModal);
    handleVisibility(!showModal);
  }

  return (
    <Modal show={showModal} onHide={setVisibility} size='sm'>
      <Modal.Header className='modalHeader' closeButton>
        <Modal.Title className='modalTitle'>Schedule Meet</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody" >
        <Form class="modalForm" action="">
          <div className="form-group">
            <label htmlFor="teacherEmail">Teacher's Email:</label>
            <input type="email" value={userName} className="form-control" id="teacherEmail" placeholder={userName} required />
          </div>

          {/* Students' Emails */}
          <div className="form-group">
            <label htmlFor="studentsEmail">Students' Emails:</label>
            <textarea className="form-control" value={studentEmails} onChange={(e) => setStudentEmails(e.target.value)} id="studentsEmail" placeholder="Enter students' emails (comma-separated)" rows="3" required></textarea>
          </div>

          {/* Schedule Date and Time */}
          <div className="form-group">
            <label htmlFor="scheduleDateTime">Schedule Date and Time:</label>
            <input type="datetime-local" value={scheduledTime} onChange={(e) => isValidScheduledTime(e.target.value)} className="form-control" id="scheduleDateTime" required />
          </div>
          {dateValueError && <div className="invalid-feedback">
            Please choose a valid date and time
          </div>}

          {/* Set Duration */}
          <div className="form-group">
            <label htmlFor="duration">Meeting Duration (in minutes):</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              value={duration}
              min="30"
              max="300"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          {/* Set meet topic*/}
          <div className="form-group">
            <label htmlFor="studentsEmail">Meet Pupose</label>
            <textarea className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)} id="meetTopic" placeholder="Enter meet topic" rows="3" required></textarea>
          </div>
        </Form>
        <Modal.Footer className='modalFooter'>
          <span><button type="button" class="btn btn-primary" onClick={handleScheduleClass}>Schedule Meet</button></span>
          <span><button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={setVisibility}>Cancel</button></span>
        </Modal.Footer>
      </Modal.Body>
    </Modal >
  );
};

export default ScheduleForm;
