import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { loadFromLocalStorage, localStorageMiddleware } from "../store/localStorage";

import artistsReducer from "../store/reducers/artistsReducer";
import albumsReducer from "../store/reducers/albumsReducer";
import usersReducer from "../store/reducers/usersReducer";
import trackHistoryReducer from "../store/reducers/trackHistoryReducer";
import tracksReducer from "../store/reducers/tracksReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  artists: artistsReducer,
  albums: albumsReducer,
  users: usersReducer,
  history: trackHistoryReducer,
  tracks: tracksReducer
});

const middleware = [thunkMiddleware, routerMiddleware(history), localStorageMiddleware];
const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage(); 

const store = createStore(rootReducer, persistedState, enhancers);

export default store;