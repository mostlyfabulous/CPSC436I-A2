import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';

class MessageList extends React.Component {

  render() {
    const msgs = this.props.messages;
    const listMessages = msgs.map((msg) => {
      return <Message key={msg.id} value={msg.text} />;
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

class Message extends React.Component {
  render() {
      return <li key={this.props.id}>{this.props.value}</li>;
  }
}

class App extends Component {
  render() {
    const initialMessages = [
    {id: 1, text: "This is the first post"},
    {id: 2, text: "This is the second post"},
    {id: 2, text: "This is the third post"}
  ];
  // <img src={logo} className="App-logo" alt="logo" />
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Assignment 2<br></br>Message Board</h2>

        </div>
        <p className="App-intro">
          Write your message below:
        </p>
        <div className="Messages">
            <MessageList messages={initialMessages}/>
        </div>
      </div>

    );
  }
}


export default App;
