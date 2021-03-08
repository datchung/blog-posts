// Import the RestaurantList component from this path
import RestaurantList from './RestaurantList';

function RestaurantListPage() {
  return (
    <>
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
    </>
  );
}

export default RestaurantListPage;