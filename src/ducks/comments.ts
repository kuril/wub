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

export const COMMENTS_START_LOADING = "comments/startLoading"
export const COMMENTS_SET_RESULT = "comments/setResult"
export const COMMENTS_POST = "comments/post"
export const COMMENTS_POST_CONFIRM = "comments/postConfirm"


type CommentStartLoadingAction = Action & { payload: ArticleId };
type CommentSetResultAction = Action & { payload: Commentary[] };
type PostCommentAction = Action & { payload: Commentary };
type ConfirmPostCommentAction = Action & { payload: CommentaryPostedConfirm };
export type CommentAction =
    | CommentStartLoadingAction
    | CommentSetResultAction
    | PostCommentAction
    | ConfirmPostCommentAction;


export const commentsInitialState: CommentState = {
    list: [],
    articleId: 0,
    isLoading: false,
}

export const createCommentStartLoadingAction =
    (payload: ArticleId): CommentStartLoadingAction => ({ type: COMMENTS_START_LOADING, payload })
export const createCommentSetResultAction =
    (payload: Commentary[]): CommentSetResultAction => ({ type: COMMENTS_SET_RESULT, payload })
export const createPostCommentAction =
    (payload: Commentary): PostCommentAction => ({ type: COMMENTS_POST, payload })
export const createConfirmPostCommentAction =
    (payload: CommentaryPostedConfirm): ConfirmPostCommentAction => ({ type: COMMENTS_POST_CONFIRM, payload })

export const commentReducer: Reducer<CommentState, CommentAction> = (state = commentsInitialState, action) => {
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
            return {
                ...state,
                list: state.list.map(c => c.requestId == requestId ? { ...c, id: commentId } : c),
            }
    }
    return state;
}

export const selectCommentList: Selector<RootState, Commentary[]> = state => state.comments.list;

export const selectCommentTree = createSelector<RootState, Commentary[], CommentNode[]>(
    selectCommentList,
    list => {
        const children =  (x: number) => list.filter(y => y.parent == x);;
        return children(null).map(x => ({ comment: x, children: children(x.id) }))
    },
)