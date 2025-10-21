import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <main>
        <h4>ResQR</h4>
      </main>
      <ul>
        <li>
          <Link to="/personal-update">Personal Info</Link>
        </li>
        <li>
          <Link to="/guardain-update">Gaurdain Info</Link>
        </li>
        <li>
          <Link to="/medical-update">Medical Info</Link>
        </li>
        <li>
          <Link to="/emergency-info">Emergencies</Link>
        </li>
        <li>
          <Link to="/grrievance">Grievances</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
