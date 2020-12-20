import React from 'react';
import io from 'socket.io-client'

var socket = io("http://127.0.0.1:4000/",{ transports: ['websocket'] });

class Chat extends React.Component
{
    constructor(props) {
      super(props);
      this.state = {
        chatMessage: "",
        currentUser: 0,
        chatData: {}
      };
      this.sendMessage = this.sendMessage.bind(this);
      this.onHandleState = this.onHandleState.bind(this);
    } 

    sendMessage() {
      socket.emit("chat message",{ usr: this.props.user ,msg: this.state.chatMessage});
    }
    
      onHandleState (e) {
        console.log(e.target.value);
        this.setState({
          chatMessage: e.target.value
        });
      }
    
      componentDidMount() {
        var socket = io("http://127.0.0.1:4000/",{ transports: ['websocket'] });        
        socket.emit('join', this.state.nickName);

        socket.on('updateMessage', (data) => { 
          console.log(data.currentUser);
          this.setState({
            currentUser: data.currentUser
          })
        });
      }
    
    render() {
        return (
            <div>
              <h1>여긴 채팅 페이지</h1>
              <h5>현재 접속자 수 : {this.state.currentUser}</h5>
              <input className="msg" onChange={this.onHandleState} type="text"></input>
              <button className="send" onClick={this.sendMessage} >보내기</button>
            </div>
        )
    }
}

export default Chat;