const URL = "https://basic-message-board.herokuapp.com/";
export const FETCH_MESSAGES_BEGIN   = 'FETCH_MESSAGES_BEGIN';
export const FETCH_MESSAGES_SUCCESS  = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';
export const FETCH_MESSAGES_DETAIL = 'FETCH_MESSAGES_DETAIL';
export const DELETE_MESSAGES_SUCCESS  = 'DELETE_MESSAGES_SUCCESS';

export const fetchMessagesBegin = () => ({
  type: FETCH_MESSAGES_BEGIN
});

export const fetchMessagesSuccess = messagesAPI => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: { messagesAPI }
});

export const fetchMessagesDetail = detailedMessage => ({
  type: FETCH_MESSAGES_DETAIL,
  payload: { detailedMessage }
});

export const fetchMessagesFailure = error => ({
  type: FETCH_MESSAGES_FAILURE,
  payload: { error }
});

export const deleteMessagesSuccess = deletedMessageID => ({
  type: DELETE_MESSAGES_SUCCESS,
  payload: { deletedMessageID }
});


export function fetchMessages() {
  // console.log("fetching messages");
  return dispatch => {
    dispatch(fetchMessagesBegin());
    return fetch(URL)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMessagesSuccess(json));
        // console.log("success!");
        // console.log(json);
        return json;
      })
      .catch(error => dispatch(fetchMessagesFailure(error)));
  };
}

export function selMessage(messageID) {
  let msg = {"id": messageID};
  // console.log("selecting message");
  return dispatch => {
    dispatch(fetchMessagesBegin());
    return fetch(URL + "messages", {
      method: 'PUT',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(msg)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMessagesDetail(json));
        // console.log("success!");
        // console.log(json);
        return json;
      })
      .catch(error => dispatch(fetchMessagesFailure(error)));
  };
}

export function addMessage(message) {
  let msg = {"text": message};
  return dispatch => {
    dispatch(fetchMessagesBegin());
    // console.log("adding message text: " + message);
    return fetch(URL + "messages", {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(msg)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMessagesSuccess(json));
        // console.log("success!");
        // console.log(json);
        return json;
      })
      .catch(error => dispatch(fetchMessagesFailure(error)));
  };
}

export function delMessage(messageID) {
  let msg = {"id": messageID};
  return dispatch => {
    dispatch(fetchMessagesBegin());
    // console.log("deleting message id: " + messageID);
    return fetch(URL + "messages", {
      method: 'DELETE',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(msg)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(deleteMessagesSuccess(json));
        // console.log("success!");
        // console.log(json);
        return json;
      })
      .catch(error => dispatch(fetchMessagesFailure(error)));
  };
}

export function sendReply(messageID, text) {
  let msg = {
    "id": messageID,
    "text": text
};
  return dispatch => {
    dispatch(fetchMessagesBegin());
    // console.log("deleting message id: " + messageID);
    return fetch(URL + "reply", {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(msg)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMessagesSuccess(json));
        // console.log("success!");
        // console.log(json);
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
