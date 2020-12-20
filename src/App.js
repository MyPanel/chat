import React from 'react';
import Login from './components/login';
import Chat from './components/chat';

class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentMenu: 1,
      chatMessage: "",
    };
    this.onHandleState = this.onHandleState.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  } 
  sendMessage() {
    //socket.emit("chat message",{msg:this.state.chatMessage});
  }

  parentCallback = (dataFromChild) => {
    // 자식 컴포넌트에서 받은 값을 이용한 로직 처리
    console.log(dataFromChild);
    if(dataFromChild) {
      this.setState({
        currentMenu: 2,
        currentUser: dataFromChild
      })
    }
  }


  onHandleState (e) {
    console.log(e.target.value);
    this.setState({
      chatMessage: e.target.value
    });
  }

render() {
  var component;
  if(this.state.currentMenu == 1) {
    console.log("현재 로그인 메뉴");
    component = <Login callbackFromParent={this.parentCallback}></Login>
  }
  
  if(this.state.currentMenu == 2) {
    console.log("현재 채팅방");
    component = <Chat user={this.state.currentUser}></Chat>
  }

    return (
        <div>
          {component}
        </div>
    )
}
}

export default App;