import React, { use } from "react";
import AuthForm from "../components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { setFormType } from "../redux/FormTypeSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth); 
  const navigate = useNavigate();

  useEffect(() => { 
    dispatch(setFormType("register"));
  }, [dispatch])
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/landing"); 
    }
  }, [isAuthenticated, navigate]);
  
  return <div>
    <AuthForm />
  </div>;
};

export default RegistrationPage;
