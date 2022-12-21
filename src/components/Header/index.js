import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header
      className={`${styles.headerMain} d-flex flex-row align-items-center justify-content-between`}
    >
      <Link to="/">
        <h1 className={`mb-0`}>Routing_</h1>
      </Link>

      <div className="d-flex ml-4">
        <NavLink
          to="/mystery"
          className="btn btn--outlined btn--light ml-3 ml-lg-4"
        >
          <i className="fa-solid fa-question"></i>
          <span className="ml-2 d-none d-sm-inline">Mystery</span>
        </NavLink>
        <NavLink
          to="/account"
          className="btn btn--outlined btn--light ml-3 ml-lg-4"
        >
          <i className="fa-solid fa-user"></i>
          <span className="ml-2 d-none d-sm-inline">Account</span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
