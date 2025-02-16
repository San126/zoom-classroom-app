import React, { useState } from 'react';
import { Card, Button, Collapse, ListGroup, FormControl, Badge } from 'react-bootstrap';
import moment from 'moment';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsTrash, BsPlus } from 'react-icons/bs';

const ExpandableCard = ({ title, meetingUrl, participants, duration, scheduledTime }) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newEmails, setNewEmails] = useState('');
    const [showAddEmailTextArea, setShowAddEmailTextArea] = useState(false);
    const [existingEmails, setExistingEmails] = useState(participants?.studentEmails || []);
    const [selectedEmails, setSelectedEmails] = useState([]);

    const now = moment();
    const classTime = moment(scheduledTime);
    const classEndTime = classTime.clone().add(duration, 'minutes');
    let status = '';

    if (classTime.isAfter(now)) {
        status = 'upcoming';
    } else if (classEndTime.isBefore(now)) {
        status = 'past';
    } else {
        status = 'ongoing';
    }

    const handleAddEmails = () => {
        if (newEmails.trim() !== '') {
            const emailsArray = newEmails.split(',').map(email => email.trim());
            setExistingEmails([...existingEmails, ...emailsArray]);
            setNewEmails('');
            setShowAddEmailTextArea(false); // Hide the text area after adding emails
        }
    };

    const handleRemoveSelectedEmails = () => {
        const updatedEmails = existingEmails.filter(email => !selectedEmails.includes(email));
        setExistingEmails(updatedEmails);
        setSelectedEmails([]);
    };

    const toggleEmailSelection = (email) => {
        if (selectedEmails.includes(email)) {
            setSelectedEmails(selectedEmails.filter(selectedEmail => selectedEmail !== email));
        } else {
            setSelectedEmails([...selectedEmails, email]);
        }
    };

    return (
        <Card className="meetcards mb-3">
            <Card.Header>
                <div className="d-flex justify-content-between">
                    <div style={{ paddingTop: "20px" }}>
                        <strong style={{ color: "white" }}>Meet Link: </strong>
                        <a href={meetingUrl} target="_blank" rel="noopener noreferrer">{meetingUrl}</a>
                    </div>
                    <div className='justify-content-end'>
                        <Button
                            variant="link"
                            onClick={() => setOpen(!open)}
                            aria-controls="collapse-card-content"
                            aria-expanded={open}
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            {open ? <FaChevronUp style={{ color: "white" }} /> : <FaChevronDown style={{ color: "white" }} />}
                        </Button>
                    </div>
                </div>
                <div>
                    <div><strong>Start At:</strong> {moment(scheduledTime).format('DD/MM/YYYY hh:mm A')}</div>
                    <div><strong>Duration:</strong> {duration} minutes</div>
                    <Badge bg={status === 'past' ? 'danger' : status === 'ongoing' ? 'warning' : 'success'} className="mt-2">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                </div>
            </Card.Header>
            <Collapse in={open}>
                <div>
                    <FormControl
                        placeholder="Search emails"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-3"
                    />
                    <ListGroup style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <ListGroup.Item style={{paddingLeft:"9px"}} className="d-flex justify-content-between"><strong>Participants:</strong> 
                        {selectedEmails.length > 0 && (
                    <span onClick={handleRemoveSelectedEmails} className="clickable-icon mb-3 justify-content-end" aria-label="Remove">
                      <BsTrash />
                    </span>
                  )}
                        </ListGroup.Item>
                        {existingEmails
                            .filter(email => email.includes(searchTerm))
                            .map((email, index) => (
                                <ListGroup.Item style={{paddingLeft:"9px"}} key={index} onClick={() => toggleEmailSelection(email)}>
                                    <input type="checkbox" checked={selectedEmails.includes(email)} onChange={() => {}} />
                                    <span style={{ marginLeft: '5px' }}>{email}</span>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                    {showAddEmailTextArea ? (
                        <div className="mb-3">
                            <FormControl
                                as="textarea"
                                rows={3}
                                placeholder="Add emails (separated by commas)"
                                value={newEmails}
                                onChange={(e) => setNewEmails(e.target.value)}
                            />
                            <Button variant="outline-secondary" onClick={handleAddEmails} className="mt-2"><BsPlus /> Add</Button>
                        </div>
                    ) : (
                        <Button variant="outline-secondary" onClick={() => setShowAddEmailTextArea(true)} className="mb-3"><BsPlus /> Add Emails</Button>
                    )}
                </div>
            </Collapse>
        </Card>
    );
};

export default ExpandableCard;
