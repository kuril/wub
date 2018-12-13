import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { CommentListConnected } from "../controls";

type CommentsOwnProps = RouteComponentProps<{ id: string }>

export class Comments extends React.Component<CommentsOwnProps> {
    render() {
        return (
            <CommentListConnected article={Number(this.props.match.params.id)} />
        );
    }
}