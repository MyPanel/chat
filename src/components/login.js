import React from 'react';

class Login extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          nickName: "",
        };
        this.onHandleState = this.onHandleState.bind(this);
        this.sendNick = this.sendNick.bind(this);
      } 

    sendNick() {
        this.props.callbackFromParent(this.state.nickName);
    }

    onHandleState (e) {
        console.log(e.target.value);
        this.setState({
            nickName: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>닉네임 입력</h1>
                <form onSubmit={this.sendNick}>
                    <input className="msg" onChange={this.onHandleState} type="text"></input>
                </form>
            </div>
        );
    }
}

export default Login;