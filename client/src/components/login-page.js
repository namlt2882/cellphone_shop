import React, { Component } from "react";
import { UserService } from "../services/user-service";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  login = () => {
    UserService.login(this.state.username, this.state.password)
      .then(res => {
        window.location.reload();
      })
      .catch(e => {
        this.setState({ error: "Wrong username and password!" });
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        Username:
        <input
          type="text"
          value={this.state.username}
          onChange={e => {
            this.setState({ username: e.target.value });
          }}
        />
        <br />
        Password:
        <input
          type="password"
          value={this.state.password}
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        <br />
        <font color="red">{this.state.error}</font>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default LoginPage;
