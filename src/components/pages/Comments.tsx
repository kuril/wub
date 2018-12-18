import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { CommentListConnected, ArticleViewConnected } from "../controls";

type CommentsOwnProps = RouteComponentProps<{ id: string }>

export class Comments extends React.Component<CommentsOwnProps> {
    render() {
        const { id } = this.props.match.params;
        return (
            <div className="page-container">
                <div className="box">
                    <ArticleViewConnected article={id} />
                </div>
                <CommentListConnected article={Number(id)} />
            </div>

        );
    }
}