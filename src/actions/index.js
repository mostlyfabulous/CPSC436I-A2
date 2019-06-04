export const incrementMsgCount = count => {
  return {
    type: 'MESSAGE_COUNTER',
    payload: count
  };
};
