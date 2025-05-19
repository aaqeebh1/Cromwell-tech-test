import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { performLogout } from "../redux/authActions";
import { clearAuthError } from "../redux/authSlice";


const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { error } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/");
    };

    const clearLoginError = () => {
      if (error) {
        dispatch(clearAuthError());
      }
    };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/register" onClick={clearLoginError}>
              Register
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/landing">Landing</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
