import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import setAuthToken from "./utils/setAuthToken";

const initialState = {};

const middleware = [ thunk ];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();//  This gets the state of the store as soon as it is created


//  Set listener to store, and change the auth token when necessary
store.subscribe(() => {
    const previousState = currentState;

    currentState = store.getState();

    if (previousState.auths.token !== currentState.auths.token) {
        const token = currentState.auths.token;

        setAuthToken(token);
    }
});


export default store;