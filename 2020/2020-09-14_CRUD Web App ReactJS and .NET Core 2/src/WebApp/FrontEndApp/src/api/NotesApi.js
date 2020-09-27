var NotesApi = (function() {
    function _getBaseUrl() {
        return '/api/notes';
    }
  
    function createNote(note) {
        return fetch(_getBaseUrl(), {
            body: JSON.stringify(note),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
          });
    }

    function getNotes() {
        return fetch(_getBaseUrl())
            .then(rsp => rsp.json());
    }

    function updateNote(note) {
        return fetch(`${_getBaseUrl()}/${note.id}`, {
            body: JSON.stringify(note),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
          })
    }

    function deleteNote(id) {
        return fetch(`${_getBaseUrl()}/${id}`, {
            method: 'DELETE'
        });
    }
  
    return {
        createNote: createNote,
        getNotes: getNotes,
        updateNote: updateNote,
        deleteNote: deleteNote
    };
  }());
  
  export default NotesApi;