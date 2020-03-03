import React from "react";
import "./App.css";
import { UserService } from "./services/user-service";
import LoginPage from "./components/login-page";
import { Grid, Container } from "@material-ui/core";
import MyAppBar from "./components/common/my-app-bar";

function App() {
  return (
    <div>
      {UserService.isLoggedIn() ? (
        [
          <MyAppBar>
            <Container>
              xyz
            </Container>
          </MyAppBar>
        ]
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
