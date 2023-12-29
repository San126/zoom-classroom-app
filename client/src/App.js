import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [teacherEmail, setTeacherEmail] = useState('');
  const [studentEmails, setStudentEmails] = useState('');
  const [zoomLink, setZoomLink] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [classes, setClasses] = useState([]);

  const handleScheduleClass = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/classes', {
        teacherEmail,
        studentEmails: studentEmails.split(',').map((email) => email.trim()),
        zoomLink,
        scheduledTime,
      });
      console.log("hai");
      setClasses([...classes, response.data]);
      console.log('Class scheduled successfully:', response.data);
    } catch (error) {
      console.error('Error scheduling class:', error);
    }
  };

  return (
    <div>
      <h2>Schedule Classroom</h2>
      <label>Teacher's Email:</label>
      <input type="text" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} />
      <br />
      <label>Student Emails (comma-separated):</label>
      <input type="text" value={studentEmails} onChange={(e) => setStudentEmails(e.target.value)} />
      <br />
      <label>Zoom Link:</label>
      <input type="text" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} />
      <br />
      <label>Scheduled Time:</label>
      <input type="text" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
      <br />
      <button onClick={handleScheduleClass}>Schedule Classroom</button>

      <h2>Classes</h2>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            <strong>Teacher:</strong> {classItem.teacherEmail},{' '}
            <strong>Students:</strong> {classItem.studentEmails.join(', ')},{' '}
            <strong>Zoom Link:</strong> <a>{classItem.meetingUrl}</a>,{' '}
            <strong>Scheduled Time:</strong> {classItem.scheduledTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
