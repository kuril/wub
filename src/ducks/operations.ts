import { ThunkAction } from "redux-thunk";
import { RootState, ArticleId, CommentaryData, CommentPosted } from "types/wub";
import { Action } from "redux";
import {
    createCommentStartLoadingAction,
    createCommentSetResultAction,
    createPostCommentAction,
    createConfirmPostCommentAction
} from "./comments";
import { loadComments, postComment } from "../api";
import { selectUserName } from "./user";

type Operation = () => ThunkAction<void, RootState, {}, Action>;
type OperationWithArg<T> = (arg: T) => ThunkAction<void, RootState, null, Action>

export const loadCommentsOperation: OperationWithArg<ArticleId> =
    articleId => dispatch => {
        dispatch(createCommentStartLoadingAction(articleId));
        loadComments(articleId).then(
            comments => dispatch(createCommentSetResultAction(comments))
        );
    };
export const postCommentOperaion: OperationWithArg<CommentaryData> =
    data => (dispatch, getState) => {
        const comment = {
            id: -1,
            body: data.body,
            parent: data.parent,
            author: selectUserName(getState()),
            requestId: Date.now() + Math.random()
        };
        dispatch(createPostCommentAction(comment));
        postComment({ comment, article: data.article }).then(
            confirm => dispatch(createConfirmPostCommentAction(confirm))
        )
    }