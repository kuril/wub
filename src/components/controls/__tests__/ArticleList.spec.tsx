import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { ArticlesList } from "../ArticleList";
import { Article } from "types/wub";
import { MemoryRouter } from "react-router-dom"

const articles: Article[] = [
    { id: 1, title: "article1", body: "article1 body", author: "test author"},
    { id: 2, title: "article2", body: "article2 body", author: "test author"},
    { id: 3, title: "article3", body: "article2 body", author: "test author"},
]

describe("ActionList component", () => {
    it("renders correctly", () => {
        expect(TestRenderer.create(<MemoryRouter>
            <ArticlesList isLoading={false} loadedAt={null} list={articles} />
        </MemoryRouter>           
        )).toMatchSnapshot()
    })
})