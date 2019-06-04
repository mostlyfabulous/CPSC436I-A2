export const incrementMsgCount = count => {
  return {
    type: 'MESSAGE_COUNTER',
    payload: count
  };
};

let nextId = 4;
export const addMessage = message => {
  return {
    type: 'MESSAGE_ADD',
    payload: {
      id: nextId++,
      message
    }
  };
};

export const delMessage = messageId => {
  return {
    type: 'MESSAGE_DEL',
    payload: messageId
  };
};
