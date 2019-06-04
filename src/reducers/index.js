import { combineReducers } from 'redux';

const counterReducer = (count = 0, action) => {
  if (action.type === 'MESSAGE_COUNTER') {
    return count + action.payload;
  }
  return count;
}
const initialMessages = [
  {id: 1, text: "This is the first post"},
  {id: 2, text: "This is the second post"},
  {id: 3, text: "This is the third post"}
];

const messageReducer = (messages = initialMessages, action) => {
  if (action.type === 'MESSAGE_ADD') {
    // adds message to store
    return [...messages, {id:action.payload.id, text: action.payload.message}];
  }
  else if (action.type === 'MESSAGE_DEL') {
    return messages.filter( ({ id }) => id !== action.payload);
  }
  return messages;
}

export default combineReducers({
  count: counterReducer,
  messages: messageReducer
});

// const todos = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         {
//           id: action.id,
//           text: action.text,
//           completed: false
//         }
//       ]
