import React, { useEffect, useState } from 'react';
import { camelCase, isEmpty, upperCase, upperFirst } from 'lodash';
import moment from 'moment';

import ScheduleForm from './ScheduleForm';

const ClassRoom = ({ props, showModal }) => {
    const [classes, setClasses] = useState([]);
    const [clicked, setClickedTrue] = useState(false);
    const [formVisibility, setFormVisibility] = useState();
    const { userDetails = {} } = props;
    let count = 0;

    useEffect(() => {
        // Fetch data from the server
        fetch('http://localhost:3001/auth/schedulelist')
            .then(response => response.json())
            .then(data => setClasses([...classes, ...data]))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

      const handleVisibility = () => {
        setFormVisibility(!showModal);
      };

    return (
        <div className="scheduledetails">
            <p class="welcome"><h3>Welcome {upperFirst(userDetails?.userName?.split('@')[0])}</h3></p>
            <div><ScheduleForm showModal={formVisibility} handleVisibility={handleVisibility} props={userDetails} /></div>
            <table className="table table-striped table-sm" id="dataTable" >
                <thead className='thead'>
                    <tr className='thead'>
                        <th scope="col">Teacher:</th>
                        <th scope="col">Students:</th>
                        <th scope="col">Zoom Link:</th>
                        <th scope="col">Scheduled Time:</th>
                    </tr>
                </thead>
                {classes.map((classItem) => (
                    (moment('YYYY-MM-DDTHH:mm:ss').isAfter(moment(classItem.scheduledTime, 'YYYY-MM-DDTHH:mm:ss'))) !== true ?
                        <tbody>
                            <script>{count += 1}</script>
                            <tr className='trow' index={classItem._id} data-toggle="modal">
                                <td>{classItem.teacherEmail},{' '}</td>
                                <td>{classItem.studentEmails?.join(', ')},{' '}</td>
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
    );
};

export default ClassRoom;
