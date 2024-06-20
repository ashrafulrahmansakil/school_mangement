import { Link, NavLink } from "react-router-dom";
import "../../css/Nav.css";
const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              className="img-fluid text-bg-light"
              width="100"
              src="#"
              alt="logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/service" className="nav-link">
                  Service
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button">
                  Account
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/signup">
                      Signup
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
