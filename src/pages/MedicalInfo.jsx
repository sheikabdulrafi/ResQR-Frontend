import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingPage from "../pages/LoadingPage";

const MedicalInfo = () => {
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "https://resqr-ckss.onrender.com/user/verify",
          { withCredentials: true }
        );

        if (res.data.success && res.data.data.medicalHistories) {
          setMedicalHistories(res.data.data.medicalHistories);
        } else {
          toast.error("You must be logged in to access this page");
        }
      } catch (err) {
        console.error(err);
        toast.error("Session verification failed. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAddHistory = () => {
    const newHistory = {
      condition: "",
      medication: "",
      doctorName: "",
      hospitalName: "",
      hospitalContact: "",
      notes: "",
    };
    setMedicalHistories([newHistory, ...medicalHistories]);
  };

  const handleDeleteHistory = (index) => {
    const updated = medicalHistories.filter((_, i) => i !== index);
    setMedicalHistories(updated);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setMedicalHistories((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [name]: value } : h))
    );
  };

  const handleUpdateMedicalHistory = async () => {
    if (medicalHistories.length === 0) {
      toast.error("Medical history list cannot be empty");
      return;
    }

    try {
      setUpdating(true);
      const payload = medicalHistories.map((h) => ({
        condition: h.condition,
        medication: h.medication,
        doctorName: h.doctorName,
        hospitalName: h.hospitalName,
        hospitalContact: h.hospitalContact,
        notes: h.notes,
      }));

      const res = await axios.post(
        "https://resqr-ckss.onrender.com/user/medicalhistory/update",
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Medical history updated successfully!");
        const updatedUser = res.data.data;

        // ✅ Replace user data in localStorage with updated info
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // ✅ Update component state
        setMedicalHistories(updatedUser.medicalHistories || []);
      } else {
        toast.error(res.data.message || "Failed to update medical history");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error updating medical history");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <section className="medical-page" style={{ height: "auto" }}>
      <header>
        <h1>Medical Information</h1>
        <FaPlus
          className="add-icon"
          onClick={handleAddHistory}
          title="Add Medical History"
        />
      </header>

      {medicalHistories.length === 0 ? (
        <p className="no-records">
          No medical history yet. Click "+" to add one.
        </p>
      ) : (
        <div className="history-list">
          {medicalHistories.map((h, index) => (
            <div className="history-card" key={index}>
              <div className="card-header">
                <h2>{h.condition || "New Condition"}</h2>
                <FaTrashAlt
                  className="delete-icon"
                  onClick={() => handleDeleteHistory(index)}
                  title="Delete"
                />
              </div>

              <div className="card-body">
                <div className="form-group">
                  <label>Condition:</label>
                  <input
                    type="text"
                    name="condition"
                    value={h.condition}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="form-group">
                  <label>Medication:</label>
                  <input
                    type="text"
                    name="medication"
                    value={h.medication}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="form-group">
                  <label>Doctor Name:</label>
                  <input
                    type="text"
                    name="doctorName"
                    value={h.doctorName}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="form-group">
                  <label>Hospital Name:</label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={h.hospitalName}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="form-group">
                  <label>Hospital Contact:</label>
                  <input
                    type="text"
                    name="hospitalContact"
                    value={h.hospitalContact}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="form-group">
                  <label>Notes:</label>
                  <textarea
                    name="notes"
                    value={h.notes}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="button"
        onClick={handleUpdateMedicalHistory}
        disabled={updating}
      >
        {updating ? "Updating..." : "Update"}
      </button>
    </section>
  );
};

export default MedicalInfo;
