import hands from "../assets/hands.png";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate();
  return (
    <section className="homePage">
        <div className="left">
            <h1>Welcome to <span className="sp">ResQR</span></h1>
            <p>Your gateway to seamless restaurant experiences. Explore menus, place orders, and enjoy hassle-free dining with ResQR.</p>
            <p>Kindly please make shure you have your personal, guardain details upto date and all the given info working, so as to enable us to send emergency alerts on time without any discrepancies <br />
            Please click on the below appropriate button to proceed <br />
            </p>
            <div>
                <button className="homeButton" onClick={() => navigate("/personal-update")} >Personal Details Update</button>
                <button className="homeButton" onClick={() => navigate("/guardain-update")} >Guardain Details Update</button>
            </div>
        </div>
        <img src={hands} alt="" />

    </section>
  )
}

export default HomePage