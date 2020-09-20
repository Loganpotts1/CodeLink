import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import './App.css';


export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("useEffect");
		//	Check for localStorage Token, and load user
		if (localStorage.token) {

			setAuthToken(localStorage.token);

			dispatch(loadUser());
			console.log("Loading Token");
		}
		


		//	If user logs out on one tab, log them out on all tabs
		window.addEventListener("storage", () => {
			if (!localStorage.token)
			dispatch({ type: LOGOUT });
		});

	}, []);


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
};
