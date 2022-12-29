import styles from "./Account.module.scss";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

function Account() {
  const { user } = useContext(AuthContext);
  return (
    <div className="container d-flex align-items-center justify-content-center h-100">
      <div className={`${styles.accountContainer} flex-fill`}>
        <h2 className="text-center pb-5">Mon compte</h2>
        <h3 className="pb-4">Mes informations</h3>

        <p>
          Pseudo : <strong>{user.pseudo}</strong>
        </p>
        <p>
          Email : <strong>{user.email}</strong>
        </p>
      </div>
    </div>
  );
}

export default Account;
