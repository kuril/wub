declare module 'types/wub' {
    export type NavBarLink = { title: string, path: string };
    export type NavigationItem = NavBarLink & { component: React.ComponentClass }
    export type UserName = string | null
    export type UserState = { username: UserName, isPremium: boolean }
    export type Article = { author: UserName, title: string, body: string }
    export type ArticleState = { list: Article[], loadedAt: number | null, isLoading: boolean }
    export type RootState = { user: UserState, article: ArticleState }
}