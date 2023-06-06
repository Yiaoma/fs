import Index from "./index";
import Login from "./login";
import { Routes, Route } from "react-router-dom";
import Notifications from "../components/Notifications";
import RequireAuth from "../components/RequireAuth";

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
