import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import hands from "../assets/hands.png";


const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="userAuth">
      <div className="main">
        <div className="titles">
          <h1>Welcome to ResQR</h1>
          <p>Your gateway to seamless restaurant experiences. Log in or register to get started!</p>
          <img src={hands} alt="" />
        </div>

        <div className="formContainer">
          <div className="top">
            <button
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <div className="bottom">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserAuth;
