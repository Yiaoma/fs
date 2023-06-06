import Index from "./index";
import Login from "./login";
import { Routes, Route } from "react-router-dom";
import Notifications from "../components/Notifications";

const App = () => {
  return (
    <>
      <Notifications />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
