import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearRegistrationStatus } from "../redux/authSlice";
import "./RegistrationStatusMessage.css";

function RegistrationStatusMessage() {
  const dispatch = useDispatch();
  const { registrationStatus, registrationMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (registrationStatus === "success") {
      const timer = setTimeout(() => {
        dispatch(clearRegistrationStatus());
      }, 3000);
        
      return () => clearTimeout(timer);
    }
  }, [registrationStatus, dispatch]);

  if (!registrationStatus) return null;

  if (!registrationStatus) return null;

  return (
    <div
      className={`auth-message ${
        registrationStatus === "success" ? "success-message" : "error-message"
      }`}
      role="alert"
    >
      {registrationMessage}
    </div>
  );
}

export default RegistrationStatusMessage;
