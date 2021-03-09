import { useState } from 'react';

// Import the RestaurantListItem component from this path
import RestaurantListItem from './RestaurantListItem';
import RestaurantPicker from './RestaurantPicker';

import './RestaurantList.css';

// Destructure restaurants from props object
function RestaurantList({ restaurants }) {
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  function handleSelect(isChecked, restaurantName) {
    if(isChecked)
      setSelectedRestaurants([...selectedRestaurants, restaurantName]);
    else
      setSelectedRestaurants(selectedRestaurants.filter(name => name !== restaurantName));
  }

  return (
    <>
      <RestaurantPicker selectedRestaurants={selectedRestaurants} />
      <ul>
          {/*For each restaurant, render the RestaurantListItem component*/}
          {restaurants.map(restaurant =>
            <li key={restaurant.name}>
              {/*Each child element must have a unique "key"*/}

              {/*Pass the restaurant object to the nested component*/}
              <RestaurantListItem
                restaurant = {restaurant}
                handleSelect = {handleSelect} />
            </li>)}
      </ul>
    </>
  );
}

export default RestaurantList;