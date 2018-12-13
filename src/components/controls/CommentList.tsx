import * as React from "react";
import { ArticleId, RootState, CommentNode } from "types/wub";
import { connect } from "react-redux";
import {
    selectCommentTree,
    loadCommentsOperation as loadComments,
} from "../../ducks";
import { CommentViewConnected } from "./CommentView"


type CommentOwnProps = { article: ArticleId };
type CommentStateProps = { commentTree: CommentNode[] }
type CommentDispatchProps = { loadComments: (article: ArticleId) => void }
type CommentProps = CommentOwnProps & CommentStateProps & CommentDispatchProps

export class CommentsList extends React.Component<CommentProps> {
    componentDidMount() {
        this.props.loadComments(this.props.article);
    }
    render() {
        const { commentTree, article } = this.props
        return (<div className="page-container comments">
            {commentTree.map(n => (
                <CommentViewConnected posted={({ comment: n.comment, article })} key={n.comment.id}>
                    {n.children.map(comment => (
                        <CommentViewConnected posted={({ comment, article })} key={comment.id}/>
                    ))}
                </CommentViewConnected>
            ))}
        </div>);
    }
}


const mapStateToProps = (state: RootState) => ({
    commentTree: selectCommentTree(state),
})

const mapDispatchToProps = ({ loadComments });

export const CommentListConnected =
    connect<CommentStateProps, CommentDispatchProps, CommentOwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )(CommentsList)

