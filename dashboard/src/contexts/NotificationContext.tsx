import { createContext, useState } from "react";

export interface Notification {
  id: number;
  text: string;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (text: string) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (text: string) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: Math.random(), text },
    ]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
