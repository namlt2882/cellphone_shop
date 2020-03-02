import React from "react";
import "./App.css";
import { UserService } from "./services/user-service";
import LoginPage from "./components/login-page";

function App() {
  return (
    <div className="App">
      {UserService.isLoggedIn() ? <div></div> : <LoginPage />}
    </div>
  );
}

export default App;
