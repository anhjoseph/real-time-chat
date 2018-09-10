import React, { Component } from 'react';
import socket from '../services/socketService';
import styles from './Channels.css';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      channelName: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    socket.emitChannel(this.state.channelName);
  }

  render() {
    return (
      <aside className={styles.channels}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Channel name" className={styles.input} onChange={this.handleChange} />
          <div>
            <button className={styles.button}>Create Channel</button>
          </div>
        </form>
        <div className={styles.list}>
          {this.props.channels.map(channel =>
            <div className={styles.channel} key={channel} onClick={() => this.props.handleClick(channel)}>{channel}</div>
          )}
        </div>
      </aside>
    )
  }
}

export default Channels;
