import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

function Form() {
  const [qualifications, setQualifications] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allQualifications, setAllQualifications] = useState([]);

  const handleAddQualification = () => {
    setQualifications([...qualifications, { coursename: "", university: "", year: "" }]);
  };

  const handleRemoveQualification = (index) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications.splice(index, 1);
    setQualifications(updatedQualifications);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQualifications = qualifications.map((qualification, i) =>
      i === index ? { ...qualification, [name]: value } : qualification
    );
    setQualifications(updatedQualifications);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDetails = {
      name,
      email,
      qualifications,
    };
    try {
      await axios.post('http://localhost:5000/qualifications', userDetails);
      alert("Qualifications submitted successfully!");
      fetchQualifications();
    } catch (error) {
      console.error("Error submitting qualifications:", error);
    }
  };

  const fetchQualifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/qualifications');
      setAllQualifications(response.data);
    } catch (error) {
      console.error("Error fetching qualifications:", error);
    }
  };

  const handleDeleteQualification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/qualifications/${id}`);
      alert("Qualification deleted successfully!");
      fetchQualifications();
    } catch (error) {
      console.error("Error deleting qualification:", error);
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="qualificationForm">
          <h2 style={{ textAlign: "center" }}>Enter your Details</h2>
          <div className="userDetails">
            <div className="input">
              <label>Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input">
              <label>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="qualificationSection">
            <hr />
            <button type="button" id="addBtn" onClick={handleAddQualification}>
              +
            </button>
            {qualifications.map((qualification, index) => (
              <div key={index} className="qualificationDropdown">
                <div className="qualificationInput">
                  <label>Course name:</label>
                  <input
                    type="text"
                    name="coursename"
                    placeholder="Enter course name"
                    value={qualification.coursename}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="qualificationInput">
                  <label>University:</label>
                  <input
                    type="text"
                    name="university"
                    placeholder="Enter university"
                    value={qualification.university}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="qualificationInput">
                  <label>Year:</label>
                  <input
                    type="text"
                    name="year"
                    placeholder="Enter year"
                    value={qualification.year}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="qualificationInput">
                  <button type="button" onClick={() => handleRemoveQualification(index)}>
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="submit">
            <button type="submit" id="submitBtn">
              Submit
            </button>
          </div>
          <hr />
          <div className="displayQualification">
            <h3>Qualifications List</h3>
            <ul>
              {allQualifications.map((qualification, index) => (
                <li key={index}>
                  <strong>{qualification.name}</strong> - <strong>{qualification.email}</strong><br />
                  {qualification.coursename} - {qualification.university} ({qualification.year})
                  <button onClick={() => handleDeleteQualification(qualification._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
