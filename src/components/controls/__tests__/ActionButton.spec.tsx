import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { ActionButton } from "../ActionButton";

const loadArticles = jest.fn()

const renderWithProps = (loading: boolean) => TestRenderer.create(
    <ActionButton loading={loading} loadArticles={loadArticles} />).toJSON()

describe("ActionButton component", () => {
    it("renders correctly", () => {
        expect(renderWithProps(false)).toMatchSnapshot();
    })
    it("renders correctly when loading is true", () => {
        expect(renderWithProps(true)).toMatchSnapshot();
    })
    it("loads articles", () => {
        renderWithProps(false).props.onClick()
        expect(loadArticles.mock.calls.length).toBe(1)
    })
})