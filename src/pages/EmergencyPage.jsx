import React, { useState, useEffect } from "react";
import userData from "../assets/response.json";

const EmergencyPage = () => {
  const [emergencyHistories, setEmergencyHistories] = useState([]);

  useEffect(() => {
    if (userData && userData.emergencyHistories) {
      setEmergencyHistories(userData.emergencyHistories);
    }
  }, []);

  const formatDateTime = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString(); // Local date and time
  };

  return (
    <section className="emergency-page">
      <header>
        <h1>Emergency Histories</h1>
      </header>

      {emergencyHistories.length === 0 ? (
        <p className="no-records">No emergency records found.</p>
      ) : (
        <div className="history-list">
          {emergencyHistories.map((h, index) => (
            <div className="history-card" key={index}>
              <div className="card-header">
                <h2>{h.typeOfIncident || "General Alert"}</h2>
              </div>
              <div className="card-body">
                <p><strong>Scanned Time:</strong> {formatDateTime(h.scannedTime.$date.$numberLong)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EmergencyPage;
