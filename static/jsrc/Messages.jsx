import React, { Component, PropTypes } from 'react';

export default class Messages extends Component {
  render() {
    const msgStyle = {
      info: {
        color: '#880000',
        backgroundColor: '#ffffdd',
      },
      error: {
        color: '#000000',
        backgroundColor: '#ffaaaa',
        fontWeight: 'bold',
      },
      warning: {
        color: '#000000',
        backgroundColor: '#ffddaa',
      },
      good: {
        color: '#000000',
        backgroundColor: '#aaffaa',
      },
      special: {
        color: '#442200',
        backgroundColor: '#ccddff',
        fontWeight: 'bold',
      },
    };
    return (
      <div className="messages">{
        this.props.data.map((msg, index) => (
          <p key={index} style={msgStyle[msg.kind]}>{msg.text}</p>
        ))
        }
      </div>
    );
  }
}

Messages.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    kind: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
}

