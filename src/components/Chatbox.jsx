import React, { Component } from 'react';
import socketService from '../services/socketService';

class Chatbox extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handlePost(e) {
    e.preventDefault();
    e.target.reset();
    socketService.emitMessage(this.state.message);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlePost}>
          <input onChange={this.handleChange} />
          <button>Send</button>
        </form>
      </div>
    )
  }
};

export default Chatbox;
