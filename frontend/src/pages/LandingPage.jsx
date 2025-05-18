import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { performLogout } from '../redux/authActions';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/");
  };
  useEffect(() => {
      if (!isAuthenticated && !user) { 
          navigate('/login');
      }
  }, [isAuthenticated, user, navigate]);
  return (
    <div>
      <h1>We have landed</h1>
      <h2>Welcome, {user ? user.name : "Loading"}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LandingPage;
