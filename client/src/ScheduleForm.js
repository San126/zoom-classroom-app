import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

const ScheduleForm = ({ onDataUpdate }) => {
  const [teacherEmail, setTeacherEmail] = useState('');
  const [studentEmails, setStudentEmails] = useState('');
  const [zoomLink, setZoomLink] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [topic, setTopic] = useState('');
  const [classes, setClasses] = useState([]);

  const handleScheduleClass = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/classes', {
        teacherEmail,
        studentEmails: studentEmails.split(',').map((email) => email.trim()),
        zoomLink,
        scheduledTime,
        duration,
        topic
      });
      setClasses([...classes, response.data]);
      onDataUpdate(response.data)
      alert('Meeting scheduled successfully!');
      console.log('Class scheduled successfully:', response.data);
    } catch (error) {
      console.error('Error scheduling class:', error);
    }
  };

  return (
    <div>
      <h5>Schedule Meeting</h5>
      <form className="px-4 py-3">
        {/* Teacher's Email */}
        <div className="form-group">
          <label htmlFor="teacherEmail">Teacher's Email:</label>
          <input type="email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className="form-control" id="teacherEmail" placeholder="Enter teacher's email" required />
        </div>

        {/* Students' Emails */}
        <div className="form-group">
          <label htmlFor="studentsEmail">Students' Emails:</label>
          <textarea className="form-control" value={studentEmails} onChange={(e) => setStudentEmails(e.target.value)} id="studentsEmail" placeholder="Enter students' emails (comma-separated)" rows="3" required></textarea>
        </div>

        {/* Schedule Date and Time */}
        <div className="form-group">
          <label htmlFor="scheduleDateTime">Schedule Date and Time:</label>
          <input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="form-control" id="scheduleDateTime" required />
        </div>

        {/* Set Duration */}
        <div className="form-group">
          <label htmlFor="duration">Meeting Duration (in minutes):</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        {/* Set meet topic*/}
        <div className="form-group">
          <label htmlFor="studentsEmail">Meet Pupose</label>
          <textarea className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)} id="meetTopic" placeholder="Enter meet topic" rows="3" required></textarea>
        </div>
        {/* Schedule Meet Button */}
        <button type="button" className="btn btn-primary" onClick={handleScheduleClass}>Schedule Meet</button>
      </form>
    </div>
  );
};

export default ScheduleForm;
