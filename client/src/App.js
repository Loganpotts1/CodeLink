import React, { useEffect, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
//	LOCAL
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { LOGOUT } from "./actions/types";
import Spinner from "./components/utils/Spinner";
import "./scss/main.min.css";

const Landing = lazy(() => import("./components/layout/Landing"));
const Alert = lazy(() => import("./components/utils/Alert"));
const Routes = lazy(() => import("./components/navigation/Routes"));


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
			<Suspense fallback={Spinner}>
				<Alert />

				<Switch>
					<Route exact path="/" component={Landing} />
					<Route component={Routes} />
				</Switch>
			</Suspense>
		</div>
	</Router>
  );
};
