import React from 'react';
import { connect } from 'react-redux';
import { replyToMessage } from '../actions';
import { selMessage, delMessage } from '../actions/messageActions';

class Message extends React.Component {
  render() {
    return <div>
      <li onClick={ (e) =>
          {this.props.selMessage(this.props);
          }
        }

        >{this.props.value}

        <button className="delete"
          onClick={ (e) => {
            e.stopPropagation()
            this.props.delMessage(this.props.delKey);
          } }
          >X
        </button>
        <button className="reply"
          onClick={ (e) => {
            e.stopPropagation()
            this.props.replyToMessage(this.props.delKey, true);
          } }
          >reply
        </button>

      </li>
    </div>
  }
}

const mapStateToProps = (state) => {
  return { messages: state.messages };
}

export default connect(mapStateToProps, {replyToMessage, delMessage, selMessage})(Message);
