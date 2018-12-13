import * as React from "react";
import { CommentPosted, RootState } from "types/wub";
import { postCommentOperaion as postComment } from "../../ducks";
import { connect } from "react-redux";

type CommentViewOwnProps = { posted: CommentPosted };
type CommentViewStateProps = { username: string }
type CommentViewDispatchProps = { postComment: (posted: CommentPosted) => void };
type CommentViewState = { showInputForm: boolean };
type CommentViewProps = CommentViewOwnProps & CommentViewStateProps & CommentViewDispatchProps;

class CommentView extends React.Component<CommentViewProps, CommentViewState> {
    private textArea: HTMLTextAreaElement = null
    constructor(props: CommentViewProps) {
        super(props);
        this.state = { showInputForm: false };
        this.typeReply = this.typeReply.bind(this);
        this.cancel = this.cancel.bind(this);
        this.postReply = this.postReply.bind(this);
        this.initTextArea = this.initTextArea.bind(this);
    }

    initTextArea(element: HTMLTextAreaElement) {
        this.textArea = element;
        if (this.textArea) {
            this.textArea.focus();
        }
    }

    typeReply() {
        this.setState({ showInputForm: true });
    }

    cancel() {
        this.textArea.value = "";
        this.setState({ showInputForm: false });
    }

    postReply() {
        this.setState({ showInputForm: false });
        const { posted: { comment, article }, postComment, username } = this.props;
        postComment({
            article,
            comment: {
                id: -1,
                parent: comment.parent || comment.id,
                body: this.textArea.value,
                author: username,
                requestId: Date.now() + Math.random()
            },
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
                    {showInputForm && <div className="field">
                        <p className="control">
                            <textarea className="textarea"
                                placeholder="Add a comment..."
                                ref={this.initTextArea}>
                            </textarea>
                        </p>
                        <p className="control">
                            <button className="button"
                                onClick={this.postReply}>Post comment</button>
                            <button className="button"
                                onClick={this.cancel}>Cancel</button>
                        </p>
                    </div>}
                </div>
                {children}
            </div>
        </article>)
    }
};

const mapStateToProps = (state: RootState) => ({
    username: state.user.username,
})

const mapDispatchToProps = ({ postComment });

export const CommentViewConnected =
    connect<CommentViewStateProps, CommentViewDispatchProps, CommentViewOwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )(CommentView)