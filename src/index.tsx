import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import "./styles.sass";
import { NavigationItem, RootState } from "types/wub";
import { NavBar, Home, Page1, Page2, Articles, Comments } from "./components";
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

const pages: NavigationItem[] = [
    { title: "Home", path: "/home", component: Home },
    { title: "Page1", path: "/page1", component: Page1 },
    { title: "Page2", path: "/page2", component: Page2 },
    { title: "Articles", path: "/articles", component: Articles },
]

const initialRootState: RootState = {
    user: userInitialState,
    article: articleInitialState,
    comments: commentsInitialState,
}

const rootReducer = combineReducers<RootState>({ user, article, comments })

type RootAction = UserAction | ArticleAction | CommentAction

const store = createStore<RootState, RootAction, {}, {}>(
    rootReducer,
    initialRootState,
    applyMiddleware(thunk),
)

const { getState, dispatch } = store;
if (getState().user.username == null) {
    dispatch(createUserNameAction("testUser"));
}

class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar links={pages} />
                {pages.map(({ path, component }) =>
                    (<Route path={path} component={component} key={path} />))}
                <Route path="/comments/:id" component={Comments} />
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
