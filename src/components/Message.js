import React from 'react';
import { connect } from 'react-redux';
// import { selMessage } from '../actions';
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

      </li>
    </div>
  }
}

const mapStateToProps = (state) => {
  return { messages: state.messages };
}

export default connect(mapStateToProps, {delMessage, selMessage})(Message);
