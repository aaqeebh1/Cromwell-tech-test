import "./Homepage.css"; 
import { Link } from "react-router-dom"; 

const Homepage = () => {
  return (
    <main className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Dashly</h1>
        <p className="subtitle">
          Discover amazing features and services tailored for you.
        </p>
      </header>
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Notifications</h3>
            <p>
              Stay informed instantly with real-time alerts about important
              updates, messages, and system changes.
            </p>
          </div>
          <div className="feature-card">
            <h3>Smart Search Functionality</h3>
            <p>
              Quickly find what you need with advanced search filters,
              predictive suggestions, and keyword highlighting.
            </p>
          </div>
          <div className="feature-card">
            <h3>Customizable User Dashboard</h3>
            <p>
              Tailor your experience with widgets, themes, and layouts that suit
              your personal workflow and preferences.
            </p>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Join us today and take the first step towards a better experience.
        </p>
        {/* Update the 'to' prop to your actual signup route */}
        <Link to="/login" className="cta-button">
          Login Now
        </Link>
      </section>
    </main>
  );
};

export default Homepage;
