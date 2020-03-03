import React, { Component } from "react";
import { UserService } from "../services/user-service";
import Button from "@material-ui/core/Button";
import { TextField, Grid } from "@material-ui/core";

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
  };

  render() {
    return (
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <form>
            <h1>Login</h1>
            <TextField
              id="standard-required"
              label="Username"
              value={this.state.username}
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
            />
            <br />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
            <br />
            <font color="red">{this.state.error}</font>
            <br />
            <Button variant="contained" color="blue" onClick={this.login}>
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default LoginPage;
