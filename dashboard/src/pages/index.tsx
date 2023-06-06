import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Index = () => {
  const { logout } = useContext(AuthContext);

  return (
    <button
      onClick={logout}
      className="rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white shadow-md"
    >
      Logout
    </button>
  );
};

export default Index;
