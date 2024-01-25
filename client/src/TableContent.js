import moment from 'moment';

const TableContent = (props) => {
    const { props: classes = {} } = props;
    console.log((moment().diff(moment(), 'minutes')))
    let count = 0;

    return (
        <div>
            {/* <table className="table table-striped table-sm" id="dataTable">
                <thead>
                    <tr>
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
                            <tr index={classItem._id}>
                                <td>{classItem.teacherEmail},{' '}</td>
                                <td>{classItem.studentEmails?.join(', ')},{' '}</td>
                                <td><a href={classItem.meetingUrl}>{classItem.meetingUrl}</a></td>
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
                </div>} */}
        </div>
    );
};

export default TableContent;