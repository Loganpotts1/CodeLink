import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
//	LOCAL
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { LOGOUT } from "./actions/types";
import Routes from "./components/routing/Routes";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.css";


export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		
		//	Check for localStorage Token, and load user
		if (localStorage.token) {

			setAuthToken(localStorage.token);

			dispatch(loadUser());
		}
		


		//	If user logs out on one tab, log them out on all tabs
		window.addEventListener("storage", () => {
			if (!localStorage.token)
			dispatch({ type: LOGOUT });
		});

	}, []);


  return (
	  <Router>
		<Fragment>

				<Navbar />

				<Switch>
					<Route exact path="/" component={Landing} />
					<Route component={Routes} />
				</Switch>
			
		</Fragment>
	</Router>
  );
};
