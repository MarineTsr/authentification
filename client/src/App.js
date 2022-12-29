import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "components/AuthProvider";
import Header from "components/Header";
import Footer from "components/Footer";

function App() {
  return (
    <div className="d-flex flex-column flex-fill vh-100">
      <AuthProvider>
        <Header />
        <main className="main-content flex-fill">
          <Suspense>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
