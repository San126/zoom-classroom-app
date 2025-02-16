const studentEmails = () => {

  const [emailErrors, setEmailErrors] = useState([]); // Array for individual email errors
  const [studentEmails, setStudentEmails] = useState('');

return(
   <div className="form-group">
  <label htmlFor="studentsEmail">Students' Emails:</label>
  <textarea className="form-control" value={studentEmails} onChange={(e)=> setStudentEmails(e.target.value)}
              id="studentsEmail"
              placeholder="Enter students' emails (comma-separated)"
              rows="3"
              required
            ></textarea>
  {!isEmpty(emailErrors) && (
  <div className="invalid-feedback">
    {`Invalid emails: ${emailErrors.join(', ')}, please enter valid emails`}
  </div>
  )}
  {!studentEmails && <div className="invalid-feedback">This field is required</div>}
</div>
)
}

export default studentEmails;