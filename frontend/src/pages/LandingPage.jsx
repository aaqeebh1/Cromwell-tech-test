import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./LandingPage.css"; 
import { loadUser } from "../redux/authActions";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user} = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(loadUser());
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return (
      <div className="landing-page-container loading-container">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <main className="container landing-page-container">
      <header className="landing-header">
        <h1>Welcome Back, {user.name}!</h1>
        <p className="subtitle">
          We're glad to see you. Here's a quick overview of your space.
        </p>
      </header>

      <section className="user-details-section">
        <h2>Your Profile</h2>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">
              {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
