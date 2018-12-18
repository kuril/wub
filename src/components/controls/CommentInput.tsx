import * as React from "react";

type CommentInputOwnProps = {
    postReply: (text: string) => void,
    cancel: () => void 
}
type CommentInputProps = CommentInputOwnProps;

export class CommentInput extends React.Component<CommentInputProps> {
    private textArea: HTMLTextAreaElement = null
    constructor(props: CommentInputProps) {
        super(props)
        this.cancel = this.cancel.bind(this);
        this.postReply = this.postReply.bind(this);
        this.initTextArea = this.initTextArea.bind(this);
    }

    initTextArea(element: HTMLTextAreaElement) {
        this.textArea = element;
        if (this.textArea) {
            this.textArea.focus();
        }
    }

    postReply() {
        this.props.postReply(this.textArea.value)
    }

    cancel() {
        this.props.cancel()
    }

    render() {
        return (<div className="field">
        <p className="control">
            <textarea className="textarea"
                placeholder="Add a comment..."
                ref={this.initTextArea}>
            </textarea>
        </p>
        <p className="control">
            <button className="button"
                onClick={this.postReply}>Post comment</button>
            <button className="button"
                onClick={this.cancel}>Cancel</button>
        </p>
    </div>)
    }
}