import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
  render() {
    const msgs = this.props.messages;
    const listMessages = msgs.map((msg) => {
        return <Message key={msg.id}
          delKey={msg.id}
          value={msg.text}
          timestamp={msg.timestamp}
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

export default MessageList;
