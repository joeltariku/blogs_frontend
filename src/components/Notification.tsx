type NotificationProps = {
  message: string;
  isError: boolean;
};

const Notification = ({ message, isError }: NotificationProps) => {
  if (message === "") {
    return "";
  }

  return isError ? (
    <div className="error">{message}</div>
  ) : (
    <div className="success">{message}</div>
  );
};

export default Notification;
