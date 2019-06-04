import React from 'react';
import { connect } from 'react-redux';
import { delMessage, selMessage } from '../actions';

class Message extends React.Component {
  render() {
    return <div>
      <li onClick={ () =>
          {this.props.selMessage(this.props);
          }
        }

        >{this.props.value}

        <button className="delete"
          onClick={ () => {
            this.props.delMessage(this.props.delKey);} }
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
