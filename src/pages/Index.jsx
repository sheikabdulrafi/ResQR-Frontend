import mainbg from "../assets/main.jpg";
import { useNavigate } from "react-router-dom"

const Index = () => {
    const navigate = useNavigate();
  return (
    <section className="HomePage">
        <div className="left">
            <h1>Welcome to ResQR</h1>
            <p>LifeSaver QR is an emergency alert system that helps save lives during accidents by instantly notifying a person’s guardians via SMS using just a QR code. It works without the internet, paid APIs, and keeps all user data private.
</p>
            <button onClick={()=> navigate("/user-auth")}>Get Started</button>
        </div>
        <div className="right">
            <img src={mainbg} alt="ResQR Illustration" />
        </div>
    </section>
  )
}

export default Index