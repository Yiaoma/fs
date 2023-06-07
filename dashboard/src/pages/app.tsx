import Index from "./index";
import Login from "./login";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import RequireAuth from "../components/RequireAuth";
import { useContext, useEffect, useState } from "react";
import Notifications from "../components/Notifications";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { login } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error);
        }

        login(responseData.accessToken);
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    getAuth();
  }, []);

  return (
    <>
      <Notifications />
      <AnimatePresence mode="wait">
        {loading && <Loading key="Loading" />}
        <Routes location={location} key={location.pathname}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Index />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
