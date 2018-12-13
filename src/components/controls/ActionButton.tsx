import * as React from "react";
import { connect } from 'react-redux';
import { RootState } from "types/wub";
import { Dispatch } from "redux";
import { createArticleStartLoadingAction, createArticleSetResultAction } from "../../ducks";
import classnames = require("classnames");
import { loadArticles } from "../../api";

type ButtonStateProps = { loading: boolean }
type ButtonDispatchProps = { loadArticles: () => void }
type ButtonProps = ButtonStateProps & ButtonDispatchProps;

const ActionButton: React.SFC<ButtonProps> = ({ loading, loadArticles }) => {
    return (
        <button className={classnames(
            "button", "is-primary",
            { ["is-loading"]: loading })}
        onClick={loadArticles} disabled={loading} >
            Load Articles
    </button>
    )
}

const mapStateToProps = (state: RootState) => ({
    loading: state.article.isLoading,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadArticles: () => {
        dispatch(createArticleStartLoadingAction())
        loadArticles().then(result => dispatch(createArticleSetResultAction(result)))
    }
})

export const ActionButtonConnected =
    connect<ButtonStateProps, ButtonDispatchProps, {}>(
        mapStateToProps, mapDispatchToProps
    )(ActionButton)