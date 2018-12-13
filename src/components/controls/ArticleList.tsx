import * as React from "react";
import { connect } from 'react-redux';
import { Article, RootState } from "types/wub";

type ArticlesListStateProps = { list: Article[], isLoading: boolean, loadedAt: Date | null }
type ArticlesListProps = ArticlesListStateProps

const ArticlesList: React.SFC<ArticlesListProps> = ({ list, isLoading, loadedAt }) =>
    (<div className="page-container">
        {list.length < 1 && !isLoading && <small>No articles</small>}
        {isLoading && <small>Loading articles</small>}
        {list.length > 0 && !isLoading && <div className="box">{
            list.map(
                (article, i) => (<article key={i} className="media">
                    <div className="media-content">
                        <strong>{article.title}</strong>
                        <small>{article.author}</small>
                        <p>{article.body}</p>
                    </div>
                </article>))
        }</div>}
        {loadedAt && !isLoading && <small>Last updated at: {loadedAt.toLocaleString()}</small>}
    </div>)

const mapStateToProps = (state: RootState) => {
    const { list, isLoading, loadedAt } = state.article;
    return {
        list: list.concat(),
        isLoading,
        loadedAt: loadedAt != null ? new Date(loadedAt) : null,
    };
};

export const ArticleListConnected = connect<ArticlesListStateProps>(mapStateToProps)(ArticlesList)