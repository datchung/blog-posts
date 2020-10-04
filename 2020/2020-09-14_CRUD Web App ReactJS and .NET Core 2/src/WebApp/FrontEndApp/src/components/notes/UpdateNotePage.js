import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MainTitle from '../common/MainTitle';
import NoteForm from './NoteForm';
import NotesApi from '../../api/NotesApi';

class UpdateNotePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            note: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
    
        NotesApi.update(state)
        .then(rsp => {
          if (rsp.status === 200) {
            this.props.history.push('/notes');
          }
        })
        .catch(err => {
          console.error(err);
        });
    }

    async handleDelete(e) {
        e.preventDefault();
    
        NotesApi.deleteNote(this.state.note.id)
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
          <MainTitle>Update Note</MainTitle>
          <NoteForm
              onSubmit={this.handleSubmit}
              initialState={this.state.note} />
          <button 
            className="button is-light mt-5"
            onClick={this.handleDelete}>
            Delete Note
          </button>
          </Fragment>
        );
    }
}

export default withRouter(UpdateNotePage);