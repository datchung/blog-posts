import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MainTitle from '../common/MainTitle';
import PrimaryButton from '../common/PrimaryButton';
import NotesApi from '../../api/NotesApi';

export default class NotesPage extends React.Component {
  constructor() {
    super();
    this.state = { notes: [] };
  }

  componentDidMount() {
    NotesApi.get()
      .then(notes => {
        this.setState({ notes: notes });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Fragment>
        <MainTitle>Notes</MainTitle>

        <Link to="/notes/create"><PrimaryButton>Create Note</PrimaryButton></Link>

        <table className="table">
          <thead>
            <tr>
              <th>Created</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.notes.map(note => {
                return <tr key={note.id}>
                  <td>{note.createdDate}</td>
                  <td>
                    <Link to={`/notes/${note.id}`}>
                      {note.title}
                    </Link>
                  </td>
                  <td>{note.content}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </Fragment>
    );
  }
}