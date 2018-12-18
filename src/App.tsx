import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import { RootState } from "types/wub";
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    userReducer as user,
    articleReducer as article,
    commentReducer as comments,
    articleInitialState,
    userInitialState,
    UserAction,
    ArticleAction,
    createUserNameAction,
    commentsInitialState,
    CommentAction,
} from "./ducks"
import { Provider } from "react-redux";
import { Layout } from "./components";


const initialRootState: RootState = {
    user: userInitialState,
    article: articleInitialState,
    comments: commentsInitialState,
}

const rootReducer = combineReducers<RootState>({ user, article, comments })
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

type RootAction = UserAction | ArticleAction | CommentAction

const store = createStore<RootState, RootAction, {}, {}>(
    rootReducer,
    initialRootState,
    composeEnhancers(applyMiddleware(thunk)),
)

const { getState, dispatch } = store;
if (getState().user.username == null) {
    dispatch(createUserNameAction("testUser"));
}

export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>
)



