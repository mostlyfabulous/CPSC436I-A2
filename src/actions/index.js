export const incrementMsgCount = count => {
  return {
    type: 'MESSAGE_COUNTER',
    payload: count
  };
};
let nextId = 5
export const addMessage = message => {
  return {
    type: 'MESSAGE_ADD',
    payload: {
      id: nextId++,
      message
    }
  };
};
