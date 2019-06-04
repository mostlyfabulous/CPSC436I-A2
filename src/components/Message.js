import React from 'react';
import { connect } from 'react-redux';
import { delMessage } from '../actions';

class Message extends React.Component {
  render() {
    return <div>
      <li>{this.props.value}
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

export default connect(mapStateToProps, {delMessage})(Message);
