import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MainTitle from '../common/MainTitle';
import NoteForm from './NoteForm';

class CreateNotePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e, state) {
        e.preventDefault();
    
        fetch('/api/notes', {
          body: JSON.stringify(state),
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
            <MainTitle>Create Note</MainTitle>
            <NoteForm onSubmit={this.handleSubmit} />
            </Fragment>
        );
    }
}

export default withRouter(CreateNotePage);