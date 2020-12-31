import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';

const Notifications = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification);
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    content: {
      top: '95%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <Modal isOpen={notification !== ''} style={customStyles}>
      {notification}
    </Modal>
  );
};

export default Notifications;
