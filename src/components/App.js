import React, { Component } from 'react';
import MessageList from './MessageList';
import AppendMessage from './ButtonAddMsg';
import MessageDetail from './MessageDetail';
import { connect } from 'react-redux';
import { delMessage } from '../actions';
import { fetchMessages } from '../actions/messageActions'

class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { messagesAPI: [] };
// }
componentWillMount() {
  this.props.fetchMessages();
}

render() {
  const {error, loading, items } = this.props;
  if (error) return <div>Error! {error.message}</div>;
  if (loading) return <div>Loading...</div>;
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
          <MessageList messages={items}/>
      </div>
    </div>

    );
  }
}

const mapStateToProps = (state) => {
  return { messages: state.messages,
           selectedMessage: state.detailedMessage,
           items: state.messagesAPI.items,
           error: state.messagesAPI.error,
           loading: state.messagesAPI.loading
   };
}

export default connect(mapStateToProps, {delMessage, fetchMessages})(App);
