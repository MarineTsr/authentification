import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Auth.module.scss";

function Home() {
  return (
    <div className="container d-flex align-items-center justify-content-center h-100">
      <div className={`${styles.authContainer} flex-fill`}>
        <h2 className="text-center">Authentification</h2>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
