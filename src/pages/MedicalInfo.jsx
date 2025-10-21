import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import userData from "../assets/response.json"; // import JSON

const MedicalInfo = () => {
  const [medicalHistories, setMedicalHistories] = useState([]);

  useEffect(() => {
    if (userData && userData.medicalHistories) {
      setMedicalHistories(userData.medicalHistories);
    }
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

  return (
    <section className="medical-page" style={{height: "auto"}}>
      <header>
        <h1>Medical Information</h1>
        <FaPlus className="add-icon" onClick={handleAddHistory} title="Add Medical History" />
      </header>

      {medicalHistories.length === 0 ? (
        <p className="no-records">No medical history yet. Click "+" to add one.</p>
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
      <button className="button">Update</button>
    </section>
  );
};

export default MedicalInfo