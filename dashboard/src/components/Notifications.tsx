import { useEffect, useContext } from "react";
import NotificationContext, {
  type Notification,
} from "../contexts/NotificationContext";

const Notification = ({ id, text }: Notification) => {
  const { removeNotification } = useContext(NotificationContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, removeNotification]);

  return (
    <div className="rounded-md p-4 shadow-md">
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

const Notifications = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="fixed right-4 top-4">
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );
};

export default Notifications;
