import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://resqr-ckss.onrender.com/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully!");
      navigate("/user-auth"); // refresh the page after logout
    } catch (err) {
      console.error(err);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <main>
        <h4 className="text-xl font-bold">ResQR</h4>
      </main>
      <ul className="flex gap-4">
        <li>
          <Link to="/personal-update">Personal Info</Link>
        </li>
        <li>
          <Link to="/guardain-update">Guardian Info</Link>
        </li>
        <li>
          <Link to="/medical-update">Medical Info</Link>
        </li>
        <li>
          <Link to="/emergency-info">Emergencies</Link>
        </li>
        <li>
          <Link to={"#"}>Mange QR</Link>
        </li>
        <li>
          <Link to="/grievance">Grievances</Link>
        </li>
        <li>
          {/* Logout is now a button */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
