import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions';

class AppendMessage extends React.Component {
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
    this.props.addMessage(this.state.value);
    // console.log(this.props.messages);
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
        <button onClick={this.handleSubmit}>submit message</button>

      </form>;
  }
}

const mapStateToProps = (state) => {
  return { messages: state.messages };
}

export default connect(mapStateToProps, {addMessage})(AppendMessage);
// <button onClick={() => this.props.addMessage()}>
