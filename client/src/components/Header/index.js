import styles from "./Header.module.scss";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header
      className={`${styles.headerMain} d-flex flex-row align-items-center justify-content-between`}
    >
      <Link to="/">
        <h1 className={`mb-0`}>Authentification_</h1>
      </Link>

      <div className="d-flex ml-4">
        {user ? (
          <>
            <NavLink
              to="/compte"
              className="btn btn--outlined btn--light ml-3 ml-lg-4"
            >
              <i className="fa-solid fa-user"></i>
              <span className="ml-2 d-none d-sm-inline">Mon compte</span>
            </NavLink>
            <button
              type="button"
              onClick={() => logout()}
              className="btn btn--filled btn--secondary ml-3 ml-lg-4"
            >
              <i className="fa-solid fa-power-off"></i>
              <span className="ml-2 d-none d-sm-inline">Déconnexion</span>
            </button>
          </>
        ) : (
          <NavLink
            to="/auth"
            className="btn btn--outlined btn--light ml-3 ml-lg-4"
          >
            <i className="fa-solid fa-user"></i>
            <span className="ml-2 d-none d-sm-inline">Connexion</span>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
