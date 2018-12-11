import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles.sass";
import { NavBar, NavBarLink } from "./navigation/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import { Home, Page1, Page2 } from "./pages";

type NavigationItem = NavBarLink & { component: React.ComponentClass }

const pages: NavigationItem[] = [
    { title: "Home", path: "/home", component: Home },
    { title: "Page1", path: "/page1", component: Page1 },
    { title: "Page2", path: "/page2", component: Page2 },
]


class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar links={pages}/>
                {pages.map(({path, component}) => (<Route path={path} component={component} key={path}/>))}
            </React.Fragment>
        );
    }
}

const App = () => (
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('app'))
