import React from 'react';
import { connect } from 'react-redux';
import { incrementMsgCount } from '../actions';

class ButtonInc extends React.Component {
  render() {
    return <div>
      The number is: {this.props.count}
      <button onClick={() => this.props.incrementMsgCount(1)}>
        Click to increment
      </button>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return { count: state.count };
}

export default connect(mapStateToProps, {incrementMsgCount})(ButtonInc);
