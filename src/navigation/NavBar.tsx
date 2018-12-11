import * as React from "react";
import * as classnames from "classnames"

export type NavBarLink = { title: string, path: string };
export type NavBarOwnProps = { links: NavBarLink[] };
type NavBarProps = NavBarOwnProps;
type NavBarState = { menuActive: boolean };

export class NavBar extends React.Component<NavBarProps, NavBarState> {
    constructor(props: any) {
        super(props);
        this.state = { menuActive: false };
    }
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/#">
                        <span className="icon">
                            <i className="fas fa-home"></i>
                        </span>
                    </a>

                    <a role="button" className="navbar-burger"
                        aria-label="menu" aria-expanded="false"
                        onClick={() => this.setState({ menuActive: !this.state.menuActive })}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className={classnames("navbar-menu", { ["is-active"]: this.state.menuActive })}>
                    {this.props.children}
                </div>
            </nav>
        )
    }
}