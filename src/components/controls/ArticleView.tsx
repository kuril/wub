import * as React from "react";
import { Article } from "types/wub";
import { postCommentOperaion as postComment } from "../../ducks";
import { Link } from "react-router-dom";
import { CommentInput } from "./CommentInput";
import { connect } from "react-redux";
import { loadArticleById } from "../../api";

type ArticleViewOwnProps = { article: Article | string }
type ArticleViewStateProps = {}
type ArticleViewDispatchProps = { postComment?: typeof postComment };
type ArticleViewState = { showInputForm: boolean, article: Article | null };
type ArticleViewProps = ArticleViewOwnProps & ArticleViewStateProps & ArticleViewDispatchProps;

const articleIsLoaded =
    (article: Article | string): article is Article => typeof article !== "string";

export class ArticleView extends React.Component<ArticleViewProps, ArticleViewState> {
    constructor(props: ArticleViewProps) {
        super(props);
        this.state = { showInputForm: false, article: null };
        this.typeReply = this.typeReply.bind(this);
        this.cancel = this.cancel.bind(this);
        this.postReply = this.postReply.bind(this);
    }

    componentDidMount() {
        const { article } = this.props;
        if (articleIsLoaded(article)) {
            this.setState({ article: article })
        } else {
            loadArticleById(article).then(
                article => this.setState({ article })
            )
        }
    }

    typeReply() {
        this.setState({ showInputForm: true });
    }

    cancel() {
        this.setState({ showInputForm: false });
    }

    postReply(text: string) {

        const { postComment } = this.props;
        const { article } = this.state
        this.setState({ showInputForm: false });
        if (!postComment) {
            return;
        }
        postComment({
            article: article.id,
            parent: null,
            body: text,
        })
    }

    render() {
        const { article, showInputForm } = this.state;
        const linkToCommentsPage = articleIsLoaded(this.props.article);
        return (<article className="media">
            {article && <div className="media-content">
                <strong>{article.title}</strong>
                <small>{article.author}</small>
                <p>{article.body}</p>
                {linkToCommentsPage && <Link to={`/comments/${article.id}`}><small>comments</small></Link>}
                {!linkToCommentsPage && !this.state.showInputForm &&
                    <a onClick={this.typeReply}><small>comment</small></a>}
                {showInputForm && <CommentInput
                    postReply={this.postReply} cancel={this.cancel} />}
            </div>}
        </article>)
    }
}

const mapDispatchToProps = ({ postComment });

export const ArticleViewConnected =
    connect<null, ArticleViewDispatchProps, ArticleViewOwnProps>(null, mapDispatchToProps)(ArticleView)