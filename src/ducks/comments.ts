import { Reducer, Action } from 'redux';
import { createSelector, Selector } from 'reselect'
import {
    ArticleId,
    Commentary,
    CommentaryPostedConfirm,
    CommentState,
    RootState,
    CommentNode
} from 'types/wub';

const COMMENTS_START_LOADING = "comments/startLoading"
const COMMENTS_SET_RESULT = "comments/setResult"
const COMMENTS_POST = "comments/post"
const COMMENTS_POST_CONFIRM = "comments/postConfirm"


type CommentStartLoadingAction = Action & { payload: ArticleId };
type CommentSetResultAction = Action & { payload: Commentary[] };
type PostCommentAction = Action & { payload: Commentary };
type ConfirmPostCommentAction = Action & { payload: CommentaryPostedConfirm };
type CommentAction =
    | CommentStartLoadingAction
    | CommentSetResultAction
    | PostCommentAction
    | ConfirmPostCommentAction;


const commentsInitialState: CommentState = {
    list: [],
    articleId: 0,
    isLoading: false,
}

const createCommentStartLoadingAction =
    (payload: ArticleId): CommentStartLoadingAction => ({ type: COMMENTS_START_LOADING, payload })
const createCommentSetResultAction =
    (payload: Commentary[]): CommentSetResultAction => ({ type: COMMENTS_SET_RESULT, payload })
const createPostCommentAction =
    (payload: Commentary): PostCommentAction => ({ type: COMMENTS_POST, payload })
const createConfirmPostCommentAction =
    (payload: CommentaryPostedConfirm): ConfirmPostCommentAction => ({ type: COMMENTS_POST_CONFIRM, payload })

const commentReducer: Reducer<CommentState, CommentAction> = (state = commentsInitialState, action) => {
    switch (action.type) {
        case COMMENTS_START_LOADING:
            return {
                list: [],
                isLoading: true,
                articleId: (action as CommentStartLoadingAction).payload,
            };
        case COMMENTS_SET_RESULT:
            return {
                ...state,
                list: (action as CommentSetResultAction).payload,
                isLoading: false,
            };
        case COMMENTS_POST:
            return {
                ...state,
                list: state.list.concat([(action as PostCommentAction).payload]),
                isLoading: false,
            }
        case COMMENTS_POST_CONFIRM:
            const { commentId, requestId } = (action as ConfirmPostCommentAction).payload;
            console.log(state.list);
            return {
                ...state,
                list: state.list.map(c => c.requestId == requestId ? { ...c, id: commentId } : c),
            }
        default:
            break;
    }
    return state;
}

export {
    commentsInitialState,
    createCommentStartLoadingAction,
    createCommentSetResultAction,
    createPostCommentAction,
    createConfirmPostCommentAction,
    commentReducer,
    CommentAction,
}

const selectCommentList: Selector<RootState, Commentary[]> = state => state.comments.list;

const childernOf = (list: Commentary[]) => (x: number) => list.filter(y => y.parent == x);
export const selectCommentTree = createSelector<RootState, Commentary[], CommentNode[]>(
    selectCommentList,
    list => {
        const children = childernOf(list);
        return children(null).map(x => ({ comment: x, children: children(x.id) }))
    },
)