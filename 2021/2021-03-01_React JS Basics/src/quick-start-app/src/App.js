// Import css styles
import './App.css';

// Import router components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import the page components
import RestaurantListPage from './restaurants/RestaurantListPage';
import RestaurantItemPage from './restaurants/RestaurantItemPage';
import PageNotFound from './common/PageNotFound';

function App() {
  return (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">
            Restaurant Listing App
          </p>
        </div>
      </section>

      {/*Map routes to components. Order matters!*/}
      <Router>
        <Switch>
          <Route exact path="/" component={RestaurantListPage} />
          <Route path="/restaurant/:id" component={RestaurantItemPage} />
          <Route path="/restaurant" component={RestaurantListPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;