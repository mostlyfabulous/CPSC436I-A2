import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    const msgs = this.props.messages;
    const listMessages = msgs.map((msg) => {
      return <Message key={msg.id} value={msg.text} />;
        }
      );
    this.state = {value: listMessages}
    };
  render() {
      return(
        <div>
          <h2>Message List</h2>
          <ul>{this.state.value}</ul>
        </div>
      );
    }
  }

class Message extends React.Component {
  render() {
      return <li>{this.props.value}</li>;
  }
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      defaultValue: 'Write your message here...'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  // adds message to <ul> message list
  handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
  }

  render() {
      return <form>
        <h3 id="instruction">Compose Message</h3>
        <textarea
          id="message"
          onChange={this.handleChange}
          placeholder={this.state.defaultValue}>
        </textarea>
        <br></br>
        <button onClick={this.handleSubmit}>submit</button>
      </form>;
  }
}

class App extends Component {
  render() {
    const initialMessages = [
    {id: 1, text: "This is the first post"},
    {id: 2, text: "This is the second post"},
    {id: 3, text: "This is the third post"}
  ];
  // <img src={logo} className="App-logo" alt="logo" />
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Assignment 2<br></br>Message Board</h2>

        </div>
        <div id="container-div">
          <TextArea/>
        </div>
        <div className="Messages">
            <MessageList messages={initialMessages}/>
        </div>
      </div>

    );
  }
}


export default App;
