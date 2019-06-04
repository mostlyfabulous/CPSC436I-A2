import React, { Component } from 'react';
import ButtonInc from './ButtonInc'
import AppendMessage from './ButtonAddMsg';
import { connect } from 'react-redux';
// import './App.css';

class MessageList extends React.Component {
  render() {
    const msgs = this.props.messages;
    const listMessages = msgs.map((msg) => {
        return <Message key={msg.id} value={msg.text} />;
      }
    );
    console.log(msgs);
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
  // <img src={logo} className="App-logo" alt="logo" />
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Assignment 2<br></br>Message Board</h2>

        </div>
        <div id="container-div">
          <AppendMessage/>
          <ButtonInc/>
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

export default connect(mapStateToProps)(App);
