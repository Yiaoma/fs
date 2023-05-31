import Index from "./index";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </>
  );
};

export default App;
