import { useNotification } from "../context/NotificationContext";
const Notification = () => {
  const { message, messageType } = useNotification();
  const colors = {
    info: {
      color: "text-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-gray-800",
    },
    success: {
      color: "text-green-800 dark:text-green-400 bg-green-50 dark:bg-gray-800",
    },
    error: {
      color: "text-red-800 dark:text-red-400 bg-red-50 dark:bg-gray-800",
    },
  };
  if (!message) return null;
  return (
    <div
      className={`p-4 w-fit ms-auto me-4 my-4 text-sm  rounded-lg  ${colors[messageType].color}`}
      role="alert"
    >
      <span className="font-medium capitalize">{messageType} alert!</span>{" "}
      {message}
    </div>
  );
};

export default Notification;
