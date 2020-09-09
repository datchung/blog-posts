import React from 'react';

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
      <section>
        <h1>Notes</h1>

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
                return <tr key={note.noteId}>
                  <td>{note.createdDate}</td>
                  <td>{note.title}</td>
                  <td>{note.content}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </section>
    );
  }
}