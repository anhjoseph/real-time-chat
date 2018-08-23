import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import Channels from './Channels.jsx';
import Users from './users.jsx';

class Chatroom extends Component {
  constructor() {
    super();

    const socket = socketIOClient('http://localhost:3000');
    socket.on('send', (msg) => {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    });

    this.state = {
      messages: [],
      channels: [],
      users: []
    };
  };

  componentDidMount() {
    this.fetchMessages();
    this.fetchRooms();
    this.fetchUsers();
  }

  fetchMessages() {
    axios.get('/api/messages').then(({ data }) => {
      this.setState({
        messages: data
      })
    }).catch(err => {
      console.log('error fetching messages', err);
    })
  }

  fetchChannels() {
    axios.get('/api/channels').then(({ data }) => {
      this.setState({
        channels: data
      })
    }).catch(err => {
      console.log('error fetching channels', err);
    })
  }

  fetchUsers() {
    axios.get('/api/users').then(({ data }) => {
      this.setState({
        users: data
      })
    }).catch(err => {
      console.log('error fetching users', err);
    })
  }
  
  render() {
    return (
      <div>
        <div>
          CHATTERBOX
        </div>
        <Channels channels={this.state.channels} />
        <Users users={this.state.users} />
        <Messages messages={this.state.messages} />
        <Chatbox />
      </div>
    )
  }
};

export default Chatroom;
