import { Reducer, Action } from 'redux';
import { ArticleState, Article } from 'types/wub';


const ARTICLE_START_LOADING = "article/startLoading"
const ARTICLE_SET_RESULT = "article/setResult"

type ArticleStartLoadingAction = Action;
type ArticleSetResultAction = Action & { payload: Article[] };
type ArticleAction = ArticleStartLoadingAction | ArticleSetResultAction;


const articleInitialState: ArticleState = {
    list: [],
    loadedAt: null,
    isLoading: false,
}


const createArticleStartLoadingAction = () => ({ type: ARTICLE_START_LOADING })
const createArticleSetResultAction = (payload: Article[]) => ({ type: ARTICLE_SET_RESULT, payload })

const articleReducer: Reducer<ArticleState, ArticleAction> = (state = articleInitialState, action) => {
    switch(action.type) {
        case ARTICLE_START_LOADING:
            return { ...state, isLoading: true }
        case ARTICLE_SET_RESULT:
            return {
                list: (action as ArticleSetResultAction).payload,
                isLoading: false,
                loadedAt: Date.now(),
            }
        default:
            break;
    }
    return state;
}

export {
    articleInitialState,
    createArticleStartLoadingAction,
    createArticleSetResultAction,
    articleReducer,
    ArticleAction,
}