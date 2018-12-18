import * as React from "react";
import { CommentPosted, RootState } from "types/wub";
import { postCommentOperaion as postComment } from "../../ducks";
import { connect } from "react-redux";
import { CommentInput } from "./CommentInput";

type CommentViewOwnProps = { posted: CommentPosted };
type CommentViewStateProps = { }
type CommentViewDispatchProps = { postComment: typeof postComment };
type CommentViewState = { showInputForm: boolean };
type CommentViewProps = CommentViewOwnProps & CommentViewStateProps & CommentViewDispatchProps;

class CommentView extends React.Component<CommentViewProps, CommentViewState> {
    
    constructor(props: CommentViewProps) {
        super(props);
        this.state = { showInputForm: false };
        this.typeReply = this.typeReply.bind(this);
        this.cancel = this.cancel.bind(this);
        this.postReply = this.postReply.bind(this);        
    }

    typeReply() {
        this.setState({ showInputForm: true });
    }

    cancel() {
        this.setState({ showInputForm: false });
    }

    postReply(text: string) {
        this.setState({ showInputForm: false });
        const { posted: { comment, article }, postComment } = this.props;
        postComment({
            article,
            parent: comment.parent || comment.id,
            body: text,
        })
    }

    render() {
        const { posted: { comment }, children } = this.props;
        const { showInputForm } = this.state;

        return (<article className="media">
            <figure className="media-left">
                <p className="image is-32x32">
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <strong>{comment.author}</strong>
                    <p>{comment.body}</p>
                    {!showInputForm && <a onClick={this.typeReply}><small>reply</small></a>}
                    {showInputForm && <CommentInput
                        postReply={this.postReply} cancel={this.cancel}/>}
                </div>
                {children}
            </div>
        </article>)
    }
};

const mapDispatchToProps = ({ postComment });

export const CommentViewConnected =
    connect<null, CommentViewDispatchProps, CommentViewOwnProps>(null, mapDispatchToProps)(CommentView)