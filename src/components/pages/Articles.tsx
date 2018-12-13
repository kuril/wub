import * as React from "react";
import { ActionButtonConnected, ArticleListConnected } from "../controls";



export class Articles extends React.Component {
    render() {
        return (
            <div className="page-container">
                <ActionButtonConnected />
                <ArticleListConnected />
            </div>
        )
    }
}