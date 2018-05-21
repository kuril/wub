import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles.sass";


class App extends React.Component {
    render() {
        return (
            <div className="card has-text-centered is-wide">
                <header className="card-header">
                    minimal
                </header>
                <div className="card-content">
                    <h1>Web UI</h1>
                    <p>
                        Bootstrap
                    </p>
                </div>
                <footer className="card-footer">
                    &copy; 2018 Footer
                </footer>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
