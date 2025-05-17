import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFormType } from "../redux/FormTypeSlice";
import { performLogin, performRegistration } from "../redux/authActions"; // Assuming this is the correct path
import "./AuthForm.css"; // We'll create this for basic styling

const AuthForm = () => {
  const dispatch = useDispatch();
  const { currentForm, formConfig } = useSelector((state) => state.formType);
  const { isLoading, error } = useSelector((state) => state.auth); // Get loading and error from authSlice

  const currentConfig = formConfig[currentForm];
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(""); // Local error for things like password mismatch

  // Initialize form data when the form type changes or fields change
  useEffect(() => {
    const initialData = {};
    if (currentConfig && currentConfig.fields) {
      currentConfig.fields.forEach((field) => {
        initialData[field.name] = "";
      });
      setFormData(initialData);
      setFormError(""); // Clear local form errors when switching forms
    }
  }, [currentForm, currentConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (formError) setFormError(""); // Clear local error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(""); // Clear previous local errors

    if (
      currentForm === "register" &&
      formData.password !== formData.confirmPassword
    ) {
      setFormError("Passwords do not match!");
      return;
    }

    if (currentForm === "login") {
      dispatch(
        performLogin({ email: formData.email, password: formData.password })
      );
    } else if (currentForm === "register") {
      // Ensure you only send the fields your backend expects for registration
      const { confirmPassword, ...registrationData } = formData;
      dispatch(performRegistration(registrationData));
    }
  };

  const switchForm = (type) => {
    dispatch(setFormType(type));
  };

  if (!currentConfig) {
    return <div>Loading form configuration...</div>; // Or some other loading indicator
  }

  return (
    <div className="auth-form-container">
      <h2>{currentConfig.title}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {currentConfig.fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.placeholder}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
        ))}
        {formError && (
          <p className="error-message local-error-message">{formError}</p>
        )}
        {error && (
          <p className="error-message api-error-message">
            {typeof error === "string"
              ? error
              : error.message || "An API error occurred"}
          </p>
        )}
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Processing..." : currentConfig.buttonText}
        </button>
      </form>
      <div className="form-switcher">
        {currentForm === "login" ? (
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => switchForm("register")}
              className="switch-button"
              disabled={isLoading}
            >
              Register
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => switchForm("login")}
              className="switch-button"
              disabled={isLoading}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
