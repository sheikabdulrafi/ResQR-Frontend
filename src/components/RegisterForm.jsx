import React from "react";

const RegisterForm = ({ isDisabled = true, showLoginLink = true, buttonText = "Register" }) => {
  return (
    <form className="flex flex-col gap-3 max-w-md mx-auto p-4 border rounded">
      <input type="text" placeholder="First Name" disabled={isDisabled} />
      <input type="text" placeholder="Last Name" disabled={isDisabled} />
      <input type="date" disabled={isDisabled} />
      <select disabled={isDisabled}>
        <option value="select">--select--</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="text" placeholder="Phone Number" disabled={isDisabled} />
      <input type="email" placeholder="someone@example.com" disabled={isDisabled} />
      <input type="password" placeholder="Password" disabled={isDisabled} />
      <input type="password" placeholder="Confirm password" disabled={isDisabled} />

      {/* Submit button only visible when isDisabled is true */}
      {isDisabled && (
        <input
          type="submit"
          value={buttonText}
          className="mt-2 bg-blue-500 text-white p-2 rounded cursor-pointer"
        />
      )}

      {/* Show login link only if showLoginLink is true */}
      {isDisabled && showLoginLink && (
        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <a href="/user-auth" className="text-blue-500 underline">
            Login here
          </a>
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
