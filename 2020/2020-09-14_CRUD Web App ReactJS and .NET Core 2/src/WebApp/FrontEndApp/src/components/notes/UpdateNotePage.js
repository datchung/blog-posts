import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import NoteForm from './NoteForm';

class UpdateNotePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            note: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`/api/notes/${this.props.match.params.noteId}`)
          .then(rsp => rsp.json())
          .then(note => {
            this.setState({ note: note });
          })
          .catch(err => {
            console.error(err);
          });
    }

    async handleSubmit(e, state) {
        e.preventDefault();
    
        fetch(`/api/notes/${state.id}`, {
          body: JSON.stringify(state),
          cache: 'no-cache',
          headers: {
            'content-type': 'application/json'
          },
          method: 'PUT'
        })
        .then(rsp => {
          if (rsp.status === 200) {
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
            <h1>Edit Note</h1>
            <NoteForm
                onSubmit={this.handleSubmit}
                initialState={this.state.note} />
            </Fragment>
        );
    }
}

export default withRouter(UpdateNotePage);