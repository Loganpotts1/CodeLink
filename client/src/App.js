import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>

			<Route exact path="/">
				<LandingPage />
			</Route>

			<Route path="/register">
				<RegisterPage />
			</Route>

			<Route path="/login">
				<LoginPage />
			</Route>
			
		</Switch>
    </Router>
  );
}

export default App;
