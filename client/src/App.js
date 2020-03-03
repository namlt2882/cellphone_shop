import React from "react";
import "./App.css";
import { UserService } from "./services/user-service";
import LoginPage from "./components/login-page";
import { Grid, Container } from "@material-ui/core";
import MyAppBar from "./components/common/my-app-bar";
import CategoryList from "./components/category-list";

function App() {
  return (
    <div>
      {UserService.isLoggedIn() ? (
        [
          <MyAppBar>
            <Container>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <CategoryList />
              </Grid>
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
