import React, { Component } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import Channels from './Channels.jsx';
import Users from './users.jsx';
import Authenticate from '../services/authenticateService';
import socket from '../services/socketService';
import styles from './Chatroom.css';

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Authenticate.getUser(),
      users: [],
      channels: [],
      messages: []
    };

    this.config = {
      headers: {
        Authorization: 'Bearer ' + Authenticate.getToken()
      }
    };

    socket.listenUserConnect(this);
    socket.listenUserDisconnect(this);
    socket.listenChannel(this);
    socket.listenMessage(this);

    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchChannels = this.fetchChannels.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  };

  componentDidMount() {
    socket.emitUserConnect(this.state.user);
    this.fetchUsers();
    this.fetchChannels();
    this.fetchMessages();
  }

  componentWillUnmount() {
    socket.emitUserDisconnect(this.state.user);
  }

  fetchUsers() {
    axios.get('/api/users', this.config).then(({ data }) => {
      this.setState({
        users: data
      })
    }).catch(err => {
      console.log('error fetching users', err);
    })
  }

  fetchChannels() {
    axios.get('/api/channels', this.config).then(({ data }) => {
      this.setState({
        channels: data
      })
    }).catch(err => {
      console.log('error fetching channels', err);
    })
  }

  fetchMessages() {
    axios.get('/api/messages', this.config).then(({ data }) => {
      this.setState({
        messages: data
      })
    }).catch(err => {
      console.log('error fetching messages', err);
    })
  }

  handleLogout() {
    socket.emitUserDisconnect(this.state.user);
    Authenticate.removeToken();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className={styles.chatroom}>
        <div className={styles.title}>
          CHATROOM
        </div>
        <div className={styles.logout}>
          <button className={styles.button} onClick={this.handleLogout}>Log Out</button>
        </div>
        <Channels channels={this.state.channels} />
        <Messages messages={this.state.messages} />
        <Users users={this.state.users} />
        <Chatbox />
      </div>
    )
  }
};

export default Chatroom;
