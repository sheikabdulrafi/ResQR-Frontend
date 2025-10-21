import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Convert date to LocalDateTime format expected by backend
      const dobLocal = formData.dateOfBirth + "T00:00:00";

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: dobLocal,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post(
        "https://resqr-ckss.onrender.com/auth/register",
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Registration successful!");
        window.location.reload();
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-md mx-auto p-4 border rounded"
    >
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">--Select Gender--</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <input
        type="submit"
        value={loading ? "Registering..." : "Register"}
        className="mt-2 bg-blue-500 text-white p-2 rounded cursor-pointer"
        disabled={loading}
      />

      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/user-auth" className="text-blue-500 underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
