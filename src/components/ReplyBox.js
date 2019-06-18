import React from 'react';
import { connect } from 'react-redux';
import { replyToMessage } from '../actions';
import { sendReply } from '../actions/messageActions';

class ReplyBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      defaultValue: 'Write your reply here...'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  // adds message to <ul> message list by posting to server
  handleSubmit(event) {
    this.props.sendReply(this.props.reply.messageId, this.state.value);
    this.props.replyToMessage(null, false);
    event.preventDefault();
  }

  render() {
      return <form className="replybox" id="container-div">
        <h3 id="instruction">Compose Message</h3>
        <textarea
          id="message"
          onChange={this.handleChange}
          placeholder={this.state.defaultValue}>
        </textarea>
        <br></br>
        <button onClick={this.handleSubmit}>submit reply</button>

      </form>;
  }
}

const mapStateToProps = (state) => {
  return { reply: state.reply };
}

export default connect(mapStateToProps, {replyToMessage, sendReply})(ReplyBox);
// <button onClick={() => this.props.addMessage()}>
