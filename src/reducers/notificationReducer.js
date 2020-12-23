const initial = '';
const notificationReducer = (state = initial, action) => {
  switch (action.type) {
    case 'NEWNOTIF':
      return action.data.notification;
    case 'REMOVE':
      return initial;
    default:
      return state;
  }
};

export const createNotification = (notification, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEWNOTIF',
      data: {
        notification: notification,
        delay: setTimeout(() => {
          dispatch(notificationRemoval());
        }, delay),
      },
    });
  };
};

export const notificationRemoval = () => {
  return {
    type: 'REMOVE',
  };
};

export default notificationReducer;
