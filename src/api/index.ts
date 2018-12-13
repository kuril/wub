import {
    Commentary,
    Article,
    CommentPosted,
    CommentaryPostedConfirm
} from "types/wub";

const loadResource = <R, P=void>(path: string, params?: P): Promise<R> =>
    fetch(path).then(response => {
        if (response.ok) {
            console.log(response)
        }
        else {
            console.error(response)
        }
        return response.json()
    })



export const loadArticles =
    () => loadResource<Article[]>("/api/articles")

export const loadComments =
    (id: number) => loadResource<Commentary[], number>(`/api/comments?article=${id}`, id)

let postCounter = 1;
export const postComment =
    (posted: CommentPosted): Promise<CommentaryPostedConfirm> =>
        loadComments(posted.article).then(
            comments => ({
                requestId: posted.comment.requestId,
                commentId: comments.reduce((a, c) => Math.max(a, c.id), 1) + postCounter++,
            })
        );


