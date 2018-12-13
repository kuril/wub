declare module 'types/wub' {
    export type NavBarLink = { title: string, path: string };
    export type NavigationItem = NavBarLink & { component: React.ComponentClass };
    export type UserName = string | null;
    export type UserState = { username: UserName, isPremium: boolean };
    export type Posted = { id: number, author: UserName, body: string };
    export type Article = Posted & { title: string };
    export type Commentary = Posted & { parent: number | null, requestId?: number };
    export type CommentNode = { comment: Commentary, children: Commentary[] };
    export type CommentPosted = { comment: Commentary, article: ArticleId };
    export type CommentaryPostedConfirm = { requestId: number, commentId: number };
    export type ArticleState = { list: Article[], loadedAt: number | null, isLoading: boolean };  
    export type ArticleId = number
    export type CommentState = { list: Commentary[], articleId: ArticleId, isLoading: boolean }
    export type RootState = { user: UserState, article: ArticleState, comments: CommentState }
}