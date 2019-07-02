import {
  FETCH_MESSAGES_BEGIN,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_DETAIL,
  FETCH_MESSAGES_FAILURE,
  DELETE_MESSAGES_SUCCESS,
} from '../actions/messageActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
  detailedMessage: {}
};

export default function messageAPIReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_MESSAGES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_MESSAGES_SUCCESS:
      // console.log(action.payload.messagesAPI);
      return {
        ...state,
        loading: false,
        items: action.payload.messagesAPI
      };

      case FETCH_MESSAGES_DETAIL:
        return {
          ...state,
          loading: false,
          detailedMessage: action.payload.detailedMessage
        };

    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: state.messages
      };
    case DELETE_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter( (msg) => {
          return msg.id !== action.payload.deletedMessageID.id
        })
      };

    default:
      return state;
  }
}
