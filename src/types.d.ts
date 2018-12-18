declare module 'types/wub' {
    export type NavBarLink = { title: string, path: string };
    export type NavigationItem = NavBarLink & { component: React.ComponentClass };
    export type UserName = string | null;
    export type ParentId = number | null;
    export type UserState = Readonly<{ username: UserName, isPremium: boolean }>;
    export type Posted = Readonly<{ id: number, author: UserName, body: string }>;
    export type Article = Readonly<Posted & { title: string }>;
    export type Commentary = Readonly<Posted & { parent: ParentId, requestId?: number }>;
    export type CommentNode = Readonly<{ comment: Commentary, children: Commentary[] }>;
    export type CommentaryData = Readonly<{ body: string, parent: ParentId, article: ArticleId }>;
    export type CommentPosted = Readonly<{ comment: Commentary, article: ArticleId }>;
    export type CommentaryPostedConfirm = Readonly<{ requestId: number, commentId: number }>;
    export type ArticleState = Readonly<{ list: Article[], loadedAt: number | null, isLoading: boolean }>;  
    export type ArticleId = number;
    export type CommentState = Readonly<{ list: Commentary[], articleId: ArticleId, isLoading: boolean }>;
    export type RootState = Readonly<{ user: UserState, article: ArticleState, comments: CommentState }>;
}