import React from 'react';
import { connect } from 'react-redux';
import { incrementMsgCount } from '../actions';

class Button extends React.Component {
  render() {
    console.log(this.props.count);
    return <div>
      The number is: {this.props.count}
      <button onClick={() => this.props.incrementMsgCount(1)}>
        Click Me!
      </button>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return { count: state.count };
}

export default connect(mapStateToProps, {incrementMsgCount})(Button);
