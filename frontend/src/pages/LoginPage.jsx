import React, { use } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormType } from '../redux/FormTypeSlice';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(setFormType('login'));
    }, [dispatch]);

    useEffect(() => { 
        if (isAuthenticated) {
            navigate("/landing"); 
        }
    },[isAuthenticated, navigate]);
    return (
        <div>
            <AuthForm />
        </div>
    );
}

export default LoginPage;
