import Index from "./index";
import Login from "./login";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Notifications from "../components/Notifications";

const App = () => {
  return (
    <>
      <Notifications />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Index />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
