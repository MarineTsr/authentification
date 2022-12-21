import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <h2>Authentification</h2>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
}

export default Home;
