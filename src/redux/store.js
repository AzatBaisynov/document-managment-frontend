import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import login from "./reducers/login";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
    login, userReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))