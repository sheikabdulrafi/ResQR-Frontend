import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingPage from "../pages/LoadingPage";

const GuardiansPage = () => {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "https://resqr-ckss.onrender.com/user/verify",
          { withCredentials: true }
        );

        if (res.data.success && res.data.data.guardains) {
          // populate guardians from backend
          const fetchedGuardians = res.data.data.guardains.map((g) => ({
            ...g,
            _id: g._id || Date.now().toString(),
          }));
          setGuardians(fetchedGuardians);
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

  const handleAddGuardian = () => {
    const newGuardian = {
      _id: Date.now().toString(),
      firstName: "",
      lastName: "",
      age: "",
      gender: "Male",
      email: "",
      phoneNumber: "",
      isPrimary: false,
      hasPdfAccess: false,
    };
    setGuardians([newGuardian, ...guardians]);
  };

  const handleDeleteGuardian = (_id) => {
    setGuardians((prev) => prev.filter((g) => g._id !== _id));
  };

  const handleChange = (e, _id) => {
    const { name, value, type, checked } = e.target;
    setGuardians((prev) =>
      prev.map((g) =>
        g._id === _id
          ? { ...g, [name]: type === "checkbox" ? checked : value }
          : g
      )
    );
  };

  if (loading) return <LoadingPage />;

  return (
    <section className="guardians-page" style={{ height: "auto" }}>
      <header>
        <h1>Guardians</h1>
        <FaPlus
          className="add-icon"
          onClick={handleAddGuardian}
          title="Add Guardian"
        />
      </header>

      {guardians.length === 0 ? (
        <p className="no-guardians">No guardians yet. Click "+" to add one.</p>
      ) : (
        <div className="guardian-list">
          {guardians.map((g) => (
            <div className="guardian-card" key={g._id}>
              <div className="card-header">
                <h2>
                  {g.firstName || "New Guardian"} {g.lastName}
                  {g.isPrimary && <span className="primary-tag">Primary</span>}
                </h2>
                <FaTrashAlt
                  className="delete-icon"
                  onClick={() => handleDeleteGuardian(g._id)}
                  title="Delete"
                />
              </div>

              <div className="card-body">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={g.firstName}
                    onChange={(e) => handleChange(e, g._id)}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={g.lastName}
                    onChange={(e) => handleChange(e, g._id)}
                  />
                </div>

                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={g.age?.$numberInt || g.age || ""}
                    onChange={(e) => handleChange(e, g._id)}
                  />
                </div>

                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={g.gender}
                    onChange={(e) => handleChange(e, g._id)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={g.email}
                    onChange={(e) => handleChange(e, g._id)}
                  />
                </div>

                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={g.phoneNumber}
                    onChange={(e) => handleChange(e, g._id)}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="hasPdfAccess"
                      checked={g.hasPdfAccess}
                      onChange={(e) => handleChange(e, g._id)}
                    />
                    PDF Access
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="isPrimary"
                      checked={g.isPrimary}
                      onChange={(e) => handleChange(e, g._id)}
                    />
                    Primary Guardian
                  </label>
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

export default GuardiansPage;
