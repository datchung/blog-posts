import './App.css';

// Import the RestaurantList component from this path
import RestaurantList from './restaurants/RestaurantList';

function App() {
  return (
    <div className="App">
      <h1>My Restaurant Listing App</h1>

      {/*Render the RestaurantList component and pass in a list of restaurants*/}
      <RestaurantList restaurants={[
        {
          name: 'The Corner Coffee Shop',
          rating: '3'
        },
        {
          name: 'Spaghetti Paradise',
          rating: '5'
        },
        {
          name: 'BBQ Boss',
          rating: '4'
        }
      ]}/>
    </div>
  );
}

export default App;