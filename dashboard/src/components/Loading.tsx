import { BiCircle } from "react-icons/bi";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.section
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-neutral-50"
    >
      <BiCircle className="text-5xl text-green-700" />
      <BiCircle className="absolute animate-ping text-5xl text-green-700" />
    </motion.section>
  );
};

export default Loading;
