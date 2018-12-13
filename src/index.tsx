import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, combineReducers } from 'redux'
import "./styles.sass";
import { NavigationItem, RootState } from "types/wub";
import { NavBar, Home, Page1, Page2, Articles } from "./components";
import {
    userReducer,
    articleReducer,
    articleInitialState,
    userInitialState,
    UserAction,
    ArticleAction,
    createUserNameAction
} from "./ducks"
import { Provider } from "react-redux";

const pages: NavigationItem[] = [
    { title: "Home", path: "/home", component: Home },
    { title: "Page1", path: "/page1", component: Page1 },
    { title: "Page2", path: "/page2", component: Page2 },
    { title: "Articles", path: "/articles", component: Articles },
]

const initialRootState: RootState = {
    user: userInitialState,
    article: articleInitialState,
}

const rootReducer = combineReducers<RootState>({ user: userReducer, article: articleReducer })

type RootAction = UserAction | ArticleAction

const store = createStore<RootState, RootAction, {}, {}>(
    rootReducer,
    initialRootState
)

const { getState, dispatch } = store;
if (getState().user.username == null ) {
    dispatch(createUserNameAction("testUser"));
}

class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar links={pages} />
                {pages.map(({ path, component }) => (<Route path={path} component={component} key={path} />))}
            </React.Fragment>
        );
    }
}

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>

)

ReactDOM.render(<App />, document.getElementById('app'))
