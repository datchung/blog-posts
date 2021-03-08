// Import Link component
import { Link } from 'react-router-dom';

// Destructure restaurant from props object
function RestaurantListItem({ restaurant }) {
  function getRatingElement(rating) {
    // Example of conditional rendering
    switch(rating) {
      case '5':
        return <span className="tag is-success">Perfect</span>;
      case '4':
        return <span className="tag is-success is-light">Pretty good</span>;
      case '3':
        return <span className="tag is-success is-light">Acceptable</span>;
      default:
        return <span className="tag is-danger">Hmmm...</span>;
    }
  }

  return (
    <Link to={{
      pathname: '/restaurant/' + restaurant.name,
      // Pass restaurant object to linked page
      state: {
        restaurant: restaurant
      }
    }}>
      <div className="box mt-5">
        <p className="title is-4">{restaurant.name}</p>
        <p>
          {restaurant.rating}/5&nbsp;
          {getRatingElement(restaurant.rating)}
        </p>
      </div>
    </Link>
  );
}

export default RestaurantListItem;