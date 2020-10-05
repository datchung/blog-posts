var NotesApi = (function () {
    function _getBaseUrl() {
        return '/api/notes';
    }

    function create(note) {
        return fetch(_getBaseUrl(), {
            body: JSON.stringify(note),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
    }

    function get() {
        return fetch(_getBaseUrl())
            .then(rsp => rsp.json());
    }

    function update(note) {
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
        create: create,
        get: get,
        update: update,
        deleteNote: deleteNote
    };
}());

export default NotesApi;