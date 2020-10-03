[Blog Home Page](../../README.md)

# Create a ReactJS and .NET Core Web App (Part 3: CRUD Front End)

_Tags: .NET, Back End, C#, Entity Framework, Front End, Full Stack, Javascript, React, REST_

Table of Contents
1. [Introduction](#introduction)
2. [Install Packages](#packages)
8. [Conclusion](#conclusion)
5. [Comments](#comments)

## 1. <a name='introduction'></a>Introduction

This is a continuation from the previous part, which can be found [here](../2020-08-31_React%20Front%20End%20NET%20Core%20Back%20End/Post.md). In this part, we will set up an Entity Framework `DbContext`, create a class for our model, create a controller with CRUD actions using Entity Framework, and add Swagger API docs. The follow up post will be about adding CRUD functionality to the front end UI.

## 2. <a name='packages'></a>Install Packages

1. Install the following npm packages.
    * react-router-dom, for routing in the react app
    * json-server, for API mocking
    * concurrently, for running multiple scripts from one command
    
## 3. <a name='indexcshtml'></a>Modify Build Script to Automatically Generate "index.cshtml"

1. Open package.json.
2. Edit the "scripts" section as follows
   ```
   "scripts": {
      ...
      "build": "react-scripts build && (if exist ../wwwroot rmdir \"../wwwroot\" /q /s) && (move build ../wwwroot) && (copy ..\\wwwroot\\index.html ..\\Views\\Home\\Index.cshtml /y)",
      ...
   },
   ```
   * The last part of this script will copy the built index.html to the appropriate ASP directory with the proper file name (Index.cshtml)
   * This is a convinience improvement so that the developer doesn't have to manually copy and rename the built index.html file

## 5. <a name='routing'></a>Use Bulma CSS For Styling

Bulma is a popular CSS styling framework. The following steps are for installing and using Bulma in the web app.

1. Install bulma

   `npm install bulma`

2. Edit index.js to import bulma

   ```js
   import 'bulma/css/bulma.css';
   ```

3. Remove all existing custom styles App.css

## 4. <a name='baseline'></a>Add Base Line Components

1. Create the following directory structure under the web app's src directory.

```
api
components
   about
   common
   home
   notes
json-mock-api
```

2. Add the components/common/Navigation.js component. This will be used as the navigation bar for the web app. It is based on bulma's responsive navigation component.

   ```js
   import React from 'react';
   import { Link } from "react-router-dom";

   export default class Navigation extends React.Component {
      toggleBurgerMenu() {
         document.querySelector('.navbar-menu').classList.toggle('is-active');
      }
      
      render() {
         return (
            <nav className="navbar has-background-light" role="navigation" aria-label="main navigation">
            <div className="container">
               <div className="navbar-brand">
                  <Link to="/" className="navbar-item is-size-5 has-text-weight-semibold">React App</Link>

                  <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic"
                  onClick={this.toggleBurgerMenu}>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  </a>
               </div>

               <div id="navbarBasic" className="navbar-menu">
                  <div className="navbar-start">
                  <Link to="/about" className="navbar-item" onClick={this.toggleBurgerMenu}>About</Link>
                  <Link to="/notes" className="navbar-item" onClick={this.toggleBurgerMenu}>Notes</Link>
                  </div>
               </div>
            </div>
            </nav>
         );
      }
   }
   ```

3. Add the components/common/Layout.js component. This component will be the parent layout for each page for the web app.

   ```js
   import React, { Fragment } from 'react';
   import Navigation from './Navigation';

   export default class Layout extends React.Component {
      render() {
         return (
            <Fragment>
            <Navigation />
            <section className="section">
               <div className="App container">
                  {this.props.children}
               </div>
            </section>
            </Fragment>
         );
      }
   }
   ```

4. Add the components/common/MainTitle.js component. Each page will have a component to display the page's title.

   ```js
   import React from 'react';

   export default class MainTitle extends React.Component {
      render() {
         return (
            <h1 className="title">{this.props.children}</h1>
         );
      }
   }
   ```

5. Add the components/common/PrimaryButton.js component. This is the primary button component for the main call to action (CTA).

   ```js
   import React from 'react';

   export default class PrimaryButton extends React.Component {
      render() {
         return (
            <button className="button is-primary" {...this.props}>
                  {this.props.children}
            </button>
         );
      }
   }
   ```

6. Add the components/home/Home.js component.

   ```js
   import React, { Fragment } from 'react';
   import MainTitle from '../common/MainTitle';

   export default class Home extends React.Component {
      render() {
         return (
            <Fragment>
            <MainTitle>Home</MainTitle>
            </Fragment>
         );
      }
   }
   ```

## 4. <a name='routing'></a>Add Routing

1. Install react-router-dom
   
   `npm install react-router-dom`

2. Modify App.js as follows. Note the following
   * The parent rendered element is `<Router>`
   * Each `<Route>` will be a child of `<Switch>`
   * The default route "/" is connected to the Home page

   ```js
   import React from 'react';
   import {
      BrowserRouter as Router,
      Switch,
      Route
   } from 'react-router-dom';
   import './App.css';
   import Layout from './components/common/Layout';
   import Home from './components/home/Home';

   function App() {
      return (
         <Router>
            <Layout>
            <Switch>
               <Route path="/">
                  <Home />
               </Route>
            </Switch>
            </Layout>
         </Router>
      );
   }

   export default App;
   ```

## 6. <a name='routing'></a>Add Notes Page

1. Add the components/notes/NotesPage.js component.

   ```js
   import React, { Fragment } from 'react';
   import MainTitle from '../common/MainTitle';

   export default class NotesPage extends React.Component {
      render() {
         return (
            <Fragment>
            <MainTitle>NotesPage</MainTitle>
            </Fragment>
         );
      }
   }
   ```

2. Add a constructor to initialize the component's state. In this case, the state will contain a list of notes.

   ```js
   constructor() {
      super();
      this.state = { notes: [] };
   }
   ```

3. Create the api/NotesApi.js module to encapsulate getting notes from the Notes Web API. This module uses the Immediately Invoked Function Expression (IIFE) pattern.

   ```js
   var NotesApi = (function() {
      function _getBaseUrl() {
         return '/api/notes';
      }

      function get() {
         return fetch(_getBaseUrl())
            .then(rsp => rsp.json());
      }

      return {
         get: get
      };
   }());
  
   export default NotesApi;
   ```

4. Import the `NotesApi` in the `NotesPage` component.

   ```js
   import NotesApi from '../../api/NotesApi';
   ```

5. Add a `componentDidMount` method to the `NotesPage` to load notes from the Web API when the component is loaded.

   ```js
   componentDidMount() {
      NotesApi.get()
         .then(notes => {
            this.setState({ notes: notes });
         })
         .catch(err => {
            console.error(err);
         });
   }
   ```

6. Modify the `render` method to display loaded notes.

   ```js
   render() {
      return (
         <Fragment>
            <MainTitle>Notes</MainTitle>

            <Link to="/notes/create"><PrimaryButton>Add Note</PrimaryButton></Link>

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
   ```

## 7. <a name='routing'></a>Add API Mock

## 8. <a name='routing'></a>Add New Note

## 9. <a name='routing'></a>Add Update Note

## 10. <a name='routing'></a>Add Delete Note

## 11. <a name='conclusion'></a>Conclusion

The full example source code can be found [here](src).

## 12. <a name='comments'></a>Comments

_Reply to [this tweet]()._