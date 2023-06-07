import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Index = () => {
  const { logout } = useContext(AuthContext);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen w-full items-center justify-center bg-neutral-50"
    >
      <button
        onClick={logout}
        className="rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white shadow-md"
      >
        Logout
      </button>
    </motion.section>
  );
};

export default Index;
