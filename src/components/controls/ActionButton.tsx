import * as React from "react";
import { connect } from 'react-redux';
import { RootState } from "types/wub";
import { Dispatch } from "redux";
import { createArticleStartLoadingAction, createArticleSetResultAction } from "../../ducks";
import classnames = require("classnames");

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
        //emulation of loading process
        //start
        dispatch(createArticleStartLoadingAction())
        // finish in 3 sec
        setTimeout(() => dispatch(createArticleSetResultAction([
            { title: "First", author: "Anonimus", body: ".........(*\/*)........." },
            { title: "Second", author: "Anonimus", body: "Contrary to popular belief, Lorem Ipsum is not simply random text." },
            { title: "Third", author: "Anonimus", body: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested." },
        ])), 3000)
    }
})

export const ActionButtonConnected =
    connect<ButtonStateProps, ButtonDispatchProps, {}>(
        mapStateToProps, mapDispatchToProps
    )(ActionButton)