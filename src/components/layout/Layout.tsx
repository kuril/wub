import * as React from "react";
import { Route } from "react-router";
import { NavigationItem } from "types/wub";
import { Home, Page1, Page2, Articles, Comments } from "../pages";
import { NavBar } from "../navigation";


const pages: NavigationItem[] = [
    { title: "Home", path: "/home", component: Home },
    { title: "Page1", path: "/page1", component: Page1 },
    { title: "Page2", path: "/page2", component: Page2 },
    { title: "Articles", path: "/articles", component: Articles },
]

export class Layout extends React.Component {
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