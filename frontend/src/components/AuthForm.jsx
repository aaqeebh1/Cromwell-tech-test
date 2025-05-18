import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { performLogin, performRegistration } from "../redux/authActions";
import "./AuthForm.css";
import { Link } from "react-router-dom";

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const getPasswordErrors = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }
  return errors;
};

const AuthForm = () => {
  const dispatch = useDispatch();
  const { currentForm, formConfig } = useSelector((state) => state.formType);
  const { isLoading, error } = useSelector((state) => state.auth);

  const currentConfig = formConfig[currentForm];
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState("");

  useEffect(() => {
    const initialData = {};
    if (currentConfig && currentConfig.fields) {
      currentConfig.fields.forEach((field) => {
        initialData[field.name] = "";
      });
      setFormData(initialData);
      setFieldErrors({});
    }
  }, [currentForm, currentConfig]);

  const validateField = (name, value) => {
    let errorMessages = [];
    if (name === "email") {
      if (!value) {
        errorMessages.push("Email is required.");
      } else if (!isValidEmail(value)) {
        errorMessages.push("Invalid email format.");
      }
    } else if (name === "password") {
      if (!value && currentForm === "register") {
        errorMessages.push("Password is required.");
      } else if (value && currentForm === "register") {
        errorMessages = getPasswordErrors(value);
      }
    } else if (name === "confirmPassword" && currentForm === "register") {
      if (!value) {
        errorMessages.push("Confirm password is required.");
      } else if (formData.password && value !== formData.password) {
        errorMessages.push("Passwords do not match.");
      }
    } else if (name === "name" && currentForm === "register") {
      if (!value) {
        errorMessages.push("Name is required.");
      }
    } else if (name === "password" && currentForm === "login") {
      if (!value) {
        errorMessages.push("Password is required.");
      }
    }

    setFieldErrors((prev) => ({ ...prev, [name]: errorMessages }));
    return errorMessages.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (fieldErrors[name] && fieldErrors[name].length > 0)
      validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateForm = () => {
    let isValid = true;
    const newFieldErrors = {};

    currentConfig.fields.forEach((field) => {
      const value = formData[field.name] || "";
      let messages = [];
      if (field.name === "email") {
        if (!value) messages.push("Email is required.");
        else if (!isValidEmail(value)) messages.push("Invalid email format.");
      } else if (field.name === "password") {
        if (!value) messages.push("Password is required.");
        else if (currentForm === "register")
          messages = getPasswordErrors(value);
      } else if (
        field.name === "confirmPassword" &&
        currentForm === "register"
      ) {
        if (!value) messages.push("Confirm password is required.");
        else if (formData.password !== value)
          messages.push("Passwords do not match.");
      } else if (field.name === "name" && currentForm === "register") {
        if (!value) messages.push("Name is required.");
      }
      if (messages.length > 0) {
        newFieldErrors[field.name] = messages;
        isValid = false;
      }
    });
    setFieldErrors(newFieldErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!validateForm()) {
      return;
    }

    if (currentForm === "login") {
      dispatch(
        performLogin({ email: formData.email, password: formData.password })
      );
    } else if (currentForm === "register") {
      const { confirmPassword, ...registrationData } = formData;
      dispatch(performRegistration(registrationData));
    }
  };

  if (!currentConfig) {
    return <div>Loading form configuration...</div>;
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
              onBlur={handleBlur}
              required
              disabled={isLoading}
              aria-invalid={
                fieldErrors[field.name] && fieldErrors[field.name].length > 0
              }
              aria-describedby={
                fieldErrors[field.name] ? `${field.name}-error` : undefined
              }
            />
            {fieldErrors[field.name] && fieldErrors[field.name].length > 0 && (
              <div
                id={`${field.name}-error`}
                className="field-error-message"
                role="alert"
              >
                {fieldErrors[field.name].map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
            )}
          </div>
        ))}
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
            <Link to="/register" className="switch-button" disabled={isLoading}>
              Register
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to="/login" className="switch-button" disabled={isLoading}>
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
