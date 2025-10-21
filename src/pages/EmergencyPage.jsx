import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingPage from "../pages/LoadingPage";

const EmergencyPage = () => {
  const [emergencyHistories, setEmergencyHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "https://resqr-ckss.onrender.com/user/verify",
          { withCredentials: true }
        );

        if (res.data.success && res.data.data.emergencyHistories) {
          setEmergencyHistories(res.data.data.emergencyHistories);
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

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Local date and time
  };

  if (loading) return <LoadingPage />;

  return (
    <section className="emergency-page">
      <header>
        <h1>Emergency Histories</h1>
      </header>

      {emergencyHistories.length === 0 ? (
        <p className="no-records">No emergency records found.</p>
      ) : (
        <div className="history-list">
          {emergencyHistories.map((h) => (
            <div className="history-card" key={h.historyId}>
              <div className="card-header">
                <h2>{h.typeOfIncident || "General Alert"}</h2>
              </div>
              <div className="card-body">
                <p>
                  <strong>Scanned Time:</strong> {formatDateTime(h.scannedTime)}
                </p>
                <p>
                  <strong>Passer By Phone:</strong> {h.passerByPhoneNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EmergencyPage;
