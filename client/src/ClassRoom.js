import React, { useEffect, useState } from 'react';
import { upperFirst } from 'lodash';
import moment from 'moment';

import NavbarContents from './NavbarContents';

const ClassRoom = ({ props }) => {
    const [classes, setClasses] = useState([]);
    const [formVisibility, setFormVisibility] = useState();
    const details = (localStorage.getItem('user'));
    const [data, setData] = useState(JSON.parse(details));
    const { username = "" }  = data || {};
    let count = 0;

    useEffect(() => {
        // Fetch data from the server
        fetch(`http://localhost:3001/auth/schedulelist?userName=${username}`)
            .then(response => response.json())
            .then(data => setClasses([...classes, ...data]))
            .catch(error => console.error('Error fetching data:', error));
    }, [username]);

    const handleReloadPage = () => {
        const details = (localStorage.getItem('user'));
        setData(JSON.parse(details));
        window.location.reload();
    };

    return (
        <>
            <NavbarContents visibility={formVisibility} reloadPage={handleReloadPage} data={data}/>
            <div className="scheduledetails">
                <p class="welcome"><h3>Welcome {upperFirst(username?.split('@')[0])}</h3></p>
                <table className="table table-striped table-sm" id="dataTable" >
                    <thead className='thead'>
                        <tr className='thead'>
                            <th scope="col">Scheduled By</th>
                            <th scope="col">Participants</th>
                            <th scope="col">Zoom Link</th>
                            <th scope="col">Scheduled Time</th>
                        </tr>
                    </thead>
                    {classes.map((classItem) => (
                        (moment('YYYY-MM-DDTHH:mm:ss').isAfter(moment(classItem.scheduledTime, 'YYYY-MM-DDTHH:mm:ss'))) !== true ?
                            <tbody>
                                <script>{count += 1}</script>
                                <tr className='trow' index={classItem._id} data-toggle="modal">
                                    <td>{classItem.scheduledBy}{' '}</td>
                                    <td>{classItem.participants.studentEmails?.join(', ')},{' '}</td>
                                    <td><a href={classItem.meetingUrl} target='_blank'>{classItem.meetingUrl}</a></td>
                                    <td> {moment(classItem.scheduledTime).format('DD/MM/YYYY hh:mm A')}</td>
                                </tr>
                            </tbody> :
                            <></>
                    ))
                    }
                </table>
                {(count === 0) &&
                    <div className="alert alert-warning" role="alert">
                        No data found!
                    </div>}
            </div>
        </>
    );
};

export default ClassRoom;
