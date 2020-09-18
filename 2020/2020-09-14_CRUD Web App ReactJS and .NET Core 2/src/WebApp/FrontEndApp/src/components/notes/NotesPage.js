import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

export default class NotesPage extends React.Component {
  constructor() {
    super();
    this.state = { notes: [] };
  }

  componentDidMount() {
    fetch("/api/notes")
      .then(rsp => rsp.json())
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
        <h1 className="title">Notes</h1>

        <Link to="/notes/create"><button className="button is-primary is-outlined">Add Note</button></Link>

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