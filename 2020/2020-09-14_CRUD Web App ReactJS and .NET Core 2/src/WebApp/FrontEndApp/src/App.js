import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Layout from './components/common/Layout';
import Home from './components/home/Home';
import About from './components/about/About';
import NotesPage from './components/notes/NotesPage';
import CreateNotePage from './components/notes/CreateNotePage';
import UpdateNotePage from './components/notes/UpdateNotePage';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/notes/create">
            <CreateNotePage />
          </Route>
          <Route path="/notes/:noteId">
              <UpdateNotePage />
          </Route>
          <Route path="/notes">
            <NotesPage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
