import React, { useState, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { isEmpty } from 'lodash';

const EmailInput = ({ label, value, onChange, required }) => {
  const [emailErrors, setEmailErrors] = useState([]);

  useEffect(() => {
    setEmailErrors([]);
  }, [value]);

  const validateEmails = (emails) => {
    setEmailErrors([]);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmails = [];
    const invalidEmails = [];

    emails.split(',').forEach((email) => {
      email = email.trim();
      if (emailRegex.test(email)) {
        validEmails.push(email);
      } else {
        invalidEmails.push(email);
      }
    });

    if (invalidEmails.length > 0) {
      setEmailErrors(invalidEmails);
      return null;
    } else {
      return validEmails;
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const validEmails = validateEmails(value);
    console.log('Emails:', value);
    console.log('Valid Emails:', validEmails);
    onChange(value, validEmails);
  };

  return (
    <Form.Group as={Row}>
      <Form.Label column sm="4">{label}</Form.Label>
      <Col sm="8">
        <Form.Control
          as="textarea"
          value={value}
          onChange={handleEmailChange}
          placeholder="Enter emails (comma-separated)"
          rows="3"
          required={required}
        />
        {!isEmpty(emailErrors) && (
          <div className="invalid-feedback">
            {`Invalid emails: ${emailErrors.join(', ')}, please enter valid emails`}
          </div>
        )}
        {required && !value && <div className="invalid-feedback">This field is required</div>}
      </Col>
    </Form.Group>
  );
};

export default EmailInput;
