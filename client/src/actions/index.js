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
      timestamp: JSON.stringify(new Date()),
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

export const selMessage = message => {
  return {
    type: 'MESSAGE_SEL',
    payload: message
  }
}

export const replyToMessage = (messageId, replyBoxVisible) => {
  return {
    type: 'MESSAGE_RPY',
    payload: {messageId, replyBoxVisible}
  }
}
