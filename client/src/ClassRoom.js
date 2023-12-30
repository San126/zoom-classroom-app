import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import TableContent from './TableContent';
import ScheduleForm from './ScheduleForm';

const ClassRoom = (props) => {
    const [classes, setClasses] = useState([]);
    const [clicked, setClickedTrue] = useState(false);

    useEffect(() => {
        // Fetch data from the server
        fetch('http://localhost:3001/api/schedulelist')
            .then(response => response.json())
            .then(data => setClasses([...classes, ...data]))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const dataUpdate = (data) => {
        setClasses([...classes, data]);
    };

    return (
        <div className="container-sm">
            <div>
                <ScheduleForm onDataUpdate={dataUpdate} />
            </div>
            <div>
                <a
                    href="#dataTable"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="dataTable"
                    className="btn btn-link"
                    onClick={(e) => setClickedTrue(!clicked)}
                ><h6>Upcoming Classes</h6></a>
                <div>
                    {!isEmpty(classes) && clicked === true ?
                        <TableContent props={classes} className="collapse show" id="dataTable" aria-expanded="false" />
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default ClassRoom;
