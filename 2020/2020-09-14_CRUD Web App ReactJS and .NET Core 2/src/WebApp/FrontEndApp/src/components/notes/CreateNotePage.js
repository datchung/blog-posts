import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MainTitle from '../common/MainTitle';
import NoteForm from './NoteForm';
import NotesApi from '../../api/NotesApi';

class CreateNotePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e, state) {
        e.preventDefault();
    
        NotesApi.createNote(state)
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
            <MainTitle>Create Note</MainTitle>
            <NoteForm onSubmit={this.handleSubmit} />
            </Fragment>
        );
    }
}

export default withRouter(CreateNotePage);