import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
//	LOCAL
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { LOGOUT } from "./actions/types";
import Routes from "./components/routing/Routes";
import Landing from "./components/layout/Landing";
import "./scss/main.min.css";


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

	}, [dispatch]);


  return (
	<Router>
		<div className="page">
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route component={Routes} />
			</Switch>
		</div>
	</Router>
  );
};
