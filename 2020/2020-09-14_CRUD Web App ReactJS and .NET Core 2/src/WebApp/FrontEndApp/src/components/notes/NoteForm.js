import React, { Fragment } from 'react';

export default class NoteForm extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            id: null,
            title: '',
            content: '',
            isStateInitialized: false,
            submitted: false
        };
    
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        if(this.state.isStateInitialized || this.props.initialState == null)
            return;

        this.setState({ isStateInitialized: true });
        this.setState({ id: this.props.initialState.id });
        this.setState({ title: this.props.initialState.title });
        this.setState({ content: this.props.initialState.content });
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleContentChange(e) {
        this.setState({ content: e.target.value });
    }

    async handleSubmit(e) {
        this.props.onSubmit(e, this.state);
    }

    render() {
        return (
            <Fragment>
            <form onSubmit={this.handleSubmit}>
            <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            id="titleInput"
                            className="input"
                            type="text"
                            value={this.state.title}
                            onChange={this.handleTitleChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        <textarea
                            id="contentInput"
                            className="textarea"
                            cols="100"
                            rows="10"
                            value={this.state.content}
                            onChange={this.handleContentChange} />
                    </div>
                </div>
                <div class="control">
                    <button type="submit" className="button is-link">Submit</button>
                </div>
            </form>
            </Fragment>
        );
    }
}