import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import responseData from "../assets/response.json";

const PersonalPage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    if (responseData) {
      const timestamp = Number(responseData.dateOfBirth.$date.$numberLong);
      const dob = new Date(timestamp);

      const year = dob.getFullYear();
      const month = String(dob.getMonth() + 1).padStart(2, "0");
      const day = String(dob.getDate()).padStart(2, "0");
      const localDate = `${year}-${month}-${day}`;

      setFormData({
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        dateOfBirth: localDate,
        gender: responseData.gender,
        phoneNumber: responseData.phoneNumber,
        email: responseData.email,
        role: responseData.role
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = () => {
    console.log("Updated Data:", formData);
    setIsEditable(false);
  };

  return (
    <section className="personal-page">
      <header>
        <h1>Personal Details</h1>
        <FaEdit className="edit-icon" onClick={() => setIsEditable(!isEditable)} />
      </header>

      <main>
        <form>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditable}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              disabled
            />
          </div>

          {isEditable && (
            <button type="button" className="update-btn" onClick={handleUpdate}>
              Update Details
            </button>
          )}
        </form>
      </main>
    </section>
  );
};

export default PersonalPage;
