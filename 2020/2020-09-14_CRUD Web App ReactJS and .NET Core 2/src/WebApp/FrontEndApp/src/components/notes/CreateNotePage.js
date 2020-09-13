import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class CreateNotePage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          title: '',
          content: '',
          submitted: false
        };
    
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleContentChange(e) {
        this.setState({ content: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
    
        fetch('/api/notes', {
          body: JSON.stringify(this.state),
          cache: 'no-cache',
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
        })
        .then(rsp => {
          if (rsp.status === 201 || rsp.status === 204) {
            this.props.history.push('/notes');
          }
        })
        .catch(err => {
          console.error(err);
        });
    }

    render() {
        return (
            <Fragment>
            <h1>Create Note</h1>
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

export default withRouter(CreateNotePage);