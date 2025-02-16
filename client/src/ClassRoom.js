import React, { useEffect, useState } from 'react';
import { upperFirst, startCase } from 'lodash';
import moment from 'moment';

import NavbarContents from './NavbarContents';
import ExpandableCard from './ExpandableCard';
import { Form } from 'react-bootstrap';

const ClassRoom = () => {
    const [classes, setClasses] = useState([]);
    const [formVisibility, setFormVisibility] = useState();
    const details = localStorage.getItem('user');
    const [data, setData] = useState(JSON.parse(details));
    const { username = "" } = data || {};
    const [filter, setFilter] = useState('ongoing'); // 'all', 'past', 'ongoing', 'upcoming', 'today'
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        // Fetch data from the server
        fetch(`http://localhost:3001/auth/schedulelist?userName=${username}&page=${currentPage}&limit=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                setClasses([...data?.scheduleList]);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [username, currentPage, itemsPerPage]);

    const handleReloadPage = () => {
        const details = localStorage.getItem('user');
        setData(JSON.parse(details));
        window.location.reload();
    };

    const getFilteredClasses = () => {
        const now = moment();
        return classes.filter(classItem => {
            const classTime = moment(classItem.scheduledTime);
            switch (filter) {
                case 'past':
                    return classTime.isBefore(now);
                case 'ongoing':
                    return classTime.isSame(now, 'day') && classTime.isBefore(now) && now.isBefore(classTime.add(classItem.duration, 'minutes'));
                case 'upcoming':
                    return classTime.isAfter(now);
                case 'today':
                    return classTime.isSame(now, 'day');
                default:
                    return true;
            }
        });
    };

    const ongoingMeetings = getFilteredClasses().filter(classItem => moment(classItem.scheduledTime).isSame(moment(), 'day'));

    return (
        <>
            <NavbarContents visibility={formVisibility} reloadPage={handleReloadPage} data={data} />
            <div className="scheduledetails">
                <p className="welcome"><h3>Welcome {upperFirst(username?.split('@')[0])}</h3></p>
                <hr style={{ height: "2px", backgroundColor: "white" }} />
                <Form.Group style={{ marginBottom: "20px" }} controlId="meetingFilter">
                    <Form.Label>Select Meeting Status</Form.Label>
                    <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-3">
                        <option value="all">All Meetings</option>
                        <option value="past">Past Meetings</option>
                        <option value="ongoing">Ongoing Meetings</option>
                        <option value="upcoming">Upcoming Meetings</option>
                        <option value="today">Today's Meetings</option>
                    </Form.Control>
                </Form.Group>
                {ongoingMeetings.length > 0 ? (
                    <>
                        <h4>Ongoing Meetings</h4>
                        {ongoingMeetings.map((classItem, index) => (
                            <ExpandableCard key={index} {...classItem} />
                        ))}
                    </>
                ) : (
                    <>
                        <h4>{startCase(filter)} Meetings</h4>
                        {getFilteredClasses().length > 0 ? (
                            <>
                                {getFilteredClasses().map((classItem, index) => (
                                    <ExpandableCard key={index} {...classItem} />
                                ))}
                            </>
                        ) : (
                            <div className="alert alert-warning" role="alert">
                                No data found!
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default ClassRoom;
