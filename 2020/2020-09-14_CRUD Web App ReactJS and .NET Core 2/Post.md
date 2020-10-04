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

## 2. <a name='routing'></a>Use Bulma CSS For Styling

Bulma is a popular CSS styling framework. The following steps are for installing and using Bulma in the web app.

1. Install bulma

   `npm install bulma`

2. Edit index.js to import bulma

   ```js
   import 'bulma/css/bulma.css';
   ```

3. Remove all existing styles from App.css

## 3. <a name='baseline'></a>Add Base Line Components

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

## 5. <a name='routing'></a>Add Notes Page

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

7. At this point, the notes page will encounter an error if the notes Web API is not running. In the next section, we add a mock API to remove the reliance on the Web API while in development.

## 6. <a name='routing'></a>Add API Mock

1. Install json-server to mock the Web API back end.
   
   `npm install json-server --save-dev`

2. Add the file json-mock-api/db.json. Populate the file with mock notes objects.

   ```js
   {
      "notes": [
         {
            "id": 1,
            "createdDate": "2020-09-08T02:10:10.9799513Z",
            "title": "Note 1",
            "content": "Content 1 here"
         },
         {
            "id": 2,
            "createdDate": "2020-09-07T02:10:10.9802279Z",
            "title": "Note 2",
            "content": "Content 2 here"
         }
      ]
   }
   ```

3. Add the file json-mock-api/routes.json. Populate the file with the api prefix.

   ```js
   {
      "/api/*": "/$1"
   }
   ```

4. Add the "json-server" script to package.json.

   ```js
   ...
   "scripts": {
      "json-server": "node_modules\\.bin\\json-server --watch src\\json-mock-api\\db.json --routes src\\json-mock-api\\routes.json --port 5000",
      ...
   },
   ...
   ```

5. Install concurrently to enable running the "start" and "json-server" scripts in parallel.

   `npm install concurrently --save-dev`

6. Add the "dev" script to package.json. Executing `npm run dev` will run `npm start` and `npm run json-server`.

   ```js
   ...
   "scripts": {
      "dev": "concurrently \"npm start\" \"npm run json-server\"",
      ...
   },
   ...
   ```

7. Execute `npm run dev` and navigate to the notes page. Now, you should see the notes being loaded from the mock API.

## 7. <a name='routing'></a>Add Create Note Page

## 9. <a name='routing'></a>Add Update Note Page

## 10. <a name='routing'></a>Add Delete Note Page

## 11. <a name='conclusion'></a>Conclusion

The full example source code can be found [here](src).

## 12. <a name='comments'></a>Comments

_Reply to [this tweet]()._