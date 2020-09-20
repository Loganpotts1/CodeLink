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


//  Set listener to store, and update the auth token when necessary
store.subscribe(() => {
    const previousState = currentState;
    const prevStoreToken = previousState.auths.token;

    currentState = store.getState();
    const currStoreToken = currentState.auths.token;


    if (currStoreToken !== prevStoreToken)
    setAuthToken(currStoreToken);
});


export default store;