import React, { Fragment } from 'react';

export default class NoteForm extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
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
                <div>
                    <label>Title</label>
                    <input
                        id="titleInput"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        id="contentInput"
                        cols="100"
                        rows="10"
                        value={this.state.content}
                        onChange={this.handleContentChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </Fragment>
        );
    }
}