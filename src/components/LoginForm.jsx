import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import LoadingPage from "../pages/LoadingPage";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(
          "https://resqr-ckss.onrender.com/user/verify",
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.data));
          toast.success("Welcome back!");
          navigate("/home");
        }
      } catch (err) {
        console.log("No active session found", err.message);
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    checkSession();
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://resqr-ckss.onrender.com/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(setUser(response.data.data));
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show loader only while verifying or submitting
  if (loading) return <LoadingPage />;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <input
        type="email"
        placeholder="Enter your email id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "80%", padding: "10px", fontSize: "16px" }}
        required
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "80%", padding: "10px", fontSize: "16px" }}
        required
      />
      <input
        type="submit"
        value="Login"
        style={{
          width: "80%",
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "crimson",
          color: "white",
          cursor: "pointer",
        }}
      />
      <p>
        Forgot password? <Link to="/user-auth">Reset here</Link>
      </p>
      <p>
        Don't have an account? <Link to="/user-auth">Register here</Link>
      </p>
    </form>
  );
};

export default LoginForm;
