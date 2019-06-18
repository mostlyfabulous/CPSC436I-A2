export const FETCH_MESSAGES_BEGIN   = 'FETCH_MESSAGES_BEGIN';
export const FETCH_MESSAGES_SUCESS  = 'FETCH_MESSAGES_SUCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const fetchMessagesBegin = () => ({
  type: FETCH_MESSAGES_BEGIN
});

export const fetchMessagesSuccess = messagesAPI => ({
  type: FETCH_MESSAGES_SUCESS,
  payload: { messagesAPI }
});

export const fetchMessagesFailure = error => ({
  type: FETCH_MESSAGES_FAILURE,
  payload: { error }
});


export function fetchMessages() {
  console.log("fetching messages");
  return dispatch => {
    dispatch(fetchMessagesBegin());
    return fetch("http://localhost:5000/messages")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMessagesSuccess(json));
        console.log("success!");
        console.log(json);
        return json;
      })
      .catch(error => dispatch(fetchMessagesFailure(error)));
  };
}

function handleErrors(response) {
  if(!response.ok) {
    throw Error(response.statusText)
  }
  return response;
}
