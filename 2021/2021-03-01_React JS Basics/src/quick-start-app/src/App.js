// Import css styles
import './App.css';

// Import router component
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import the page components
import RestaurantListPage from './restaurants/RestaurantListPage';
import RestaurantListItemPage from './restaurants/RestaurantListItemPage';
import PageNotFound from './PageNotFound';

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

      <Router>
        <Switch>
          <Route exact path="/" component={RestaurantListPage} />
          <Route path="/restaurant" component={RestaurantListPage} />
          <Route path="/restaurant/:id" component={RestaurantListItemPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;