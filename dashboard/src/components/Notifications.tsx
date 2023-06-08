import NotificationContext, {
  type Notification,
} from "../contexts/NotificationContext";
import { GrFormClose } from "react-icons/gr";
import { useContext, useEffect } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ id, text }: Notification) => {
  const { removeNotification } = useContext(NotificationContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="flex origin-top-right rounded-md border bg-white p-4 shadow-md"
    >
      <IoWarningOutline className="text-2xl text-red-600" />
      <p className="ml-3 pt-0.5 text-sm font-medium">{text}</p>
      <button onClick={() => removeNotification(id)}>
        <GrFormClose className="ml-4 text-xl text-neutral-50" />
      </button>
    </motion.div>
  );
};

const Notifications = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="fixed right-4 top-4 z-50 grid gap-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
