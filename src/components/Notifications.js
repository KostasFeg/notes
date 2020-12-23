import React from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div>
      {notification !== null ? <p style={style}>{notification}</p> : ''}
    </div>
  );
};

export default Notifications;
