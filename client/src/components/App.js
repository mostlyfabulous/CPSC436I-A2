import React, { Component } from 'react';
import ReplyBox from './ReplyBox';
import MessageList from './MessageList';
import AppendMessage from './ButtonAddMsg';
import MessageDetail from './MessageDetail';
import { connect } from 'react-redux';
import { delMessage } from '../actions';
import { fetchMessages } from '../actions/messageActions'

class App extends Component {

componentWillMount() {
  this.props.fetchMessages();
}

render() {
  const {error, loading, items, detailedMessage } = this.props;
  if (error) return <div>Error! {error.message}</div>;
  if (loading) return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to a MERN stack<br></br>Message Board</h2>
        <h2>Loading...</h2>
      </div>
      <div id="container-div">
        <AppendMessage/>
      </div>

    </div>
  )
  if (this.props.reply.replyBoxVisible) return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to a MERN stack<br></br>Message Board</h2>
      </div>
      <div id="container-div">
        <AppendMessage/>
        <MessageDetail message={detailedMessage} />
      </div>
      <div className="Messages">
      <br/>
        <ReplyBox/>
        <MessageList messages={items}/>
      </div>
    </div>
  )

  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to the Assignment 2<br></br>Message Board</h2>
      </div>
      <div id="container-div">
        <AppendMessage/>
        <MessageDetail message={detailedMessage} />
      </div>
      <div className="Messages">
          <MessageList messages={items}/>
      </div>
    </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
          messages: state.messages,
          // selectedMessage: state.detailedMessage,
          reply: state.reply,
          items: state.messagesAPI.items,
          error: state.messagesAPI.error,
          loading: state.messagesAPI.loading,
          detailedMessage: state.messagesAPI.detailedMessage
   };
}

export default connect(mapStateToProps, {delMessage, fetchMessages})(App);
