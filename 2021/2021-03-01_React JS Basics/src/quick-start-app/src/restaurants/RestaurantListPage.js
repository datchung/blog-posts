// Import the RestaurantList component from this path
import RestaurantList from './RestaurantList';

function RestaurantListPage() {
  return (
    <>
      {/*Render the RestaurantList component and pass in a list of restaurants*/}
      <RestaurantList restaurants={[
        {
          name: 'The Corner Coffee Shop',
          rating: '3',
          description: 'Describe The Corner Coffee Shop here...'
        },
        {
          name: 'Spaghetti Paradise',
          rating: '5',
          description: 'Describe Spaghetti Paradise here...'
        },
        {
          name: 'BBQ Boss',
          rating: '4',
          description: 'Describe BBQ Boss here...'
        }
      ]}/>
    </>
  );
}

export default RestaurantListPage;