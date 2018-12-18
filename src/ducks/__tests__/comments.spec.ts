import {
    COMMENTS_START_LOADING,
    commentReducer,
    commentsInitialState,
    createCommentStartLoadingAction,
    COMMENTS_SET_RESULT,
    createCommentSetResultAction,
    COMMENTS_POST,
    createPostCommentAction,
    COMMENTS_POST_CONFIRM,
    createConfirmPostCommentAction,
    selectCommentList,
    selectCommentTree
} from "../comments";
import { Commentary, CommentaryPostedConfirm, RootState } from "types/wub";

const testComment: Commentary = {
    id: 1,
    author: "testAuthor",
    body: "testBody",
    parent: null,
}
const testReply: Commentary = {
    ...testComment,
    id: -1,
    parent: 1,
    requestId: 999
};
const testConfirm: CommentaryPostedConfirm = {
    requestId: 999,
    commentId: 2,
}

const rootState:RootState = {
    article: { list: [], isLoading: false, loadedAt: null},
    user: { username: "", isPremium: false},
    comments: commentsInitialState,
}

describe('Comments actions', () => {
    it(`should create "${COMMENTS_START_LOADING}"`, () => {
        expect(createCommentStartLoadingAction(1)).toEqual({
            type: COMMENTS_START_LOADING,
            payload: 1,
        })
    });
    it(`should create "${COMMENTS_SET_RESULT}"`, () => {
        expect(createCommentSetResultAction([testComment])).toEqual({
            type: COMMENTS_SET_RESULT,
            payload: [testComment],
        })
    });
    it(`should create "${COMMENTS_POST}"`, () => {
        expect(createPostCommentAction(testComment)).toEqual({
            type: COMMENTS_POST,
            payload: testComment,
        })
    });
    it(`should create "${COMMENTS_POST_CONFIRM}"`, () => {
        
        expect(createConfirmPostCommentAction(testConfirm)).toEqual({
            type: COMMENTS_POST_CONFIRM,
            payload: testConfirm,
        })
    });
});

describe('Comments reducer', () => {
    it(`should handle "${COMMENTS_START_LOADING}"`, () => {
        expect(commentReducer(
            commentsInitialState,
            createCommentStartLoadingAction(1),
        )).toEqual({
            ...commentsInitialState,
            isLoading: true,
            articleId: 1,
        })
    });
    it(`should handle "${COMMENTS_SET_RESULT}"`, () => {
        expect(commentReducer(
            commentsInitialState,
            createCommentSetResultAction([testComment]),
        )).toEqual({
            ...commentsInitialState,
            isLoading: false,
            list: [testComment],
        })
    });
    it(`should handle "${COMMENTS_POST}"`, () => { 
        const currentState = {
            ...commentsInitialState,
            list: [testComment],
        };
        expect(commentReducer(
            currentState,
            createPostCommentAction(testReply),
        )).toEqual({
            ...currentState,
            list: [testComment, testReply],
        })
    });
    it(`should handle "${COMMENTS_POST_CONFIRM}"`, () => {
        const currentState = {
            ...commentsInitialState,
            list: [testComment, testReply],
        };
        expect(commentReducer(
            currentState,
            createConfirmPostCommentAction(testConfirm),
        )).toEqual({
            ...currentState,
            list: [testComment, { ...testReply, id: 2}],
        })
    });
});

describe('Comments selectors', () => {
    it('Should select comments list', () => {
        const list = [testComment]
        const state = {
            ...rootState,
            comments: {
                ...commentsInitialState,
                list,
            }
        }
        expect(selectCommentList(state)).toEqual(list);
    })
    it('Should select comments tree', () => {
        const parent1 = testComment
        const child1 = { ...parent1, id: 2, parent: parent1.id }
        const child2 = { ...parent1, id: 3, parent: parent1.id }
        const parent2 = { ...testComment, id: 4 }
        const child3 = { ...parent2, id: 5, parent: parent2.id }
        const child4 = { ...parent2, id: 6, parent: parent2.id }
        const list = [parent1, parent2, child1, child2, child3, child4]
        expect(selectCommentTree.resultFunc(list)).toEqual([
            { comment: parent1, children: [child1, child2]},
            { comment: parent2, children: [child3, child4]},
        ])
    })
});