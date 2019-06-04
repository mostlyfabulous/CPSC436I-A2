import React, { Component } from 'react';
import MessageList from './MessageList';
import AppendMessage from './ButtonAddMsg';
import MessageDetail from './MessageDetail';
import { connect } from 'react-redux';
import { delMessage } from '../actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Assignment 2<br></br>Message Board</h2>
        </div>
        <div id="container-div">
          <AppendMessage/>
          <MessageDetail message={this.props.selectedMessage} />
        </div>
        <div className="Messages">
            <MessageList messages={this.props.messages}/>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return { messages: state.messages,
           selectedMessage: state.detailedMessage
   };
}

export default connect(mapStateToProps, {delMessage})(App);
