import { combineReducers } from 'redux';
import messageAPIReducer from './messageAPIReducer';


const counterReducer = (count = 0, action) => {
  if (action.type === 'MESSAGE_COUNTER') {
    return count + action.payload;
  }
  return count;
}

const detailedMessageReducer = (detailedMessage = {}, action) => {
  if (action.type === 'MESSAGE_SEL') {
    // console.log(action.payload);
    return detailedMessage = action.payload;
  }
  return detailedMessage;
}

const initialMessages = [
  // {id: 1, text: "This is the first post", timestamp: JSON.stringify(new Date())},
  // {id: 2, text: "This is the second post", timestamp: JSON.stringify(new Date())},
  // {id: 3, text: "This is the third post", timestamp: JSON.stringify(new Date())}
];

const messageReducer = (messages = initialMessages, action) => {
  if (action.type === 'MESSAGE_ADD') {
    // adds message to store
    return [...messages, {
      id:action.payload.id,
      text: action.payload.message,
      timestamp: action.payload.timestamp
    }];
  }
  else if (action.type === 'MESSAGE_DEL') {
    return messages.filter( ({ id }) => id !== action.payload);
  }
  return messages;
}

export default combineReducers({
  count: counterReducer,
  messages: messageReducer,
  detailedMessage: detailedMessageReducer,
  messagesAPI: messageAPIReducer
});
