import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "../pages/LoadingPage";
import { toast } from "react-hot-toast";

const PersonalPage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Call backend to verify token
        const response = await axios.get(
          "https://resqr-ckss.onrender.com/user/verify",
          { withCredentials: true }
        );

        if (response.data.success) {
          setIsAuthorized(true);

          // Populate formData from backend
          const user = response.data.data;
          const dob = new Date(user.dateOfBirth);

          const year = dob.getFullYear();
          const month = String(dob.getMonth() + 1).padStart(2, "0");
          const day = String(dob.getDate()).padStart(2, "0");
          const localDate = `${year}-${month}-${day}`;

          setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: localDate,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
          });
        } else {
          toast.error("Unauthorized. Please log in.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Unauthorized. Please log in.");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const payload = { ...formData };

      const response = await axios.put(
        "https://resqr-ckss.onrender.com/user/update-personal",
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Details updated successfully!");
        setIsEditable(false);
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating.");
    }
  };

  if (loading) return <LoadingPage />;

  if (!isAuthorized) {
    return (
      <p className="text-center mt-10 text-red-500">
        Access Denied. Please log in.
      </p>
    );
  }

  return (
    <section className="personal-page">
      <header>
        <h1>Personal Details</h1>
        <FaEdit
          className="edit-icon"
          onClick={() => setIsEditable(!isEditable)}
        />
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
            <input type="text" name="role" value={formData.role} disabled />
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
