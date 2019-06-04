import React, { Component } from 'react';
import Message from './Message';
import ButtonInc from './ButtonInc'
import AppendMessage from './ButtonAddMsg';
import { connect } from 'react-redux';
import { delMessage } from '../actions';
// import './App.css';

class MessageList extends React.Component {
  render() {
    const msgs = this.props.messages;
    const listMessages = msgs.map((msg) => {
        return <Message key={msg.id} delKey={msg.id} value={msg.text}
          />;
      }
    );
    return(
      <div>
        <h2>Message List</h2>
        <ul>{listMessages}</ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
  // <img src={logo} className="App-logo" alt="logo" />
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Assignment 2<br></br>Message Board</h2>

        </div>
        <div id="container-div">
          <AppendMessage/>
        </div>
        <div className="Messages">
            <MessageList messages={this.props.messages}/>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return { messages: state.messages };
}

export default connect(mapStateToProps, {delMessage})(App);
