import Index from "./index";
import Login from "./login";
import Loading from "../components/Loading";
import { Routes, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import RequireAuth from "../components/RequireAuth";
import { useContext, useEffect, useState } from "react";
import Notifications from "../components/Notifications";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          const { accessToken } = await response.json();
          login(accessToken);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    getAuth();
  }, []);

  return (
    <AnimatePresence>
      {loading && <Loading key="Loading" />}
      <Notifications />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Index />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
