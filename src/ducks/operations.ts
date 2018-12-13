import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState, ArticleId, CommentPosted } from "types/wub";
import { Action } from "redux";
import {
    createCommentStartLoadingAction,
    createCommentSetResultAction,
    createPostCommentAction,
    createConfirmPostCommentAction
} from "./comments";
import { loadComments, postComment } from "../api";

type Operation = () => ThunkAction<void, RootState, {}, Action>;
type OperationWithArg<T> = (arg: T) => ThunkAction<void, RootState, null, Action>

export const loadCommentsOperation: OperationWithArg<ArticleId> =
    articleId => dispatch => {
        dispatch(createCommentStartLoadingAction(articleId));
        loadComments(articleId).then(
            comments => dispatch(createCommentSetResultAction(comments))
        );
    };
export const postCommentOperaion: OperationWithArg<CommentPosted> =
    posted => dispatch => {
        dispatch(createPostCommentAction(posted.comment));
        postComment(posted).then(
            confirm => dispatch(createConfirmPostCommentAction(confirm))
        )
    }