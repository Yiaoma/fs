import { useContext, useEffect } from "react";
import NotificationContext, {
  type Notification,
} from "../contexts/NotificationContext";
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="origin-top-right rounded-md bg-white p-4 shadow-md"
    >
      <p className="text-sm font-medium">{text}</p>
    </motion.div>
  );
};

const Notifications = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="fixed right-4 top-4 grid gap-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
