// Import Link component
import { Link } from 'react-router-dom';

// Import common components
import Box from '../common/Box';

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
    
      <Box>
        <p className="title is-3">
          <Link to={{
            pathname: '/restaurant/' + restaurant.name,
            // Pass restaurant object to linked page
            state: {
              restaurant: restaurant
            }
          }}>
            {restaurant.name}
          </Link>
        </p>
        
        <p>
          <label className="checkbox">
            <input type="checkbox" />
            &nbsp;{restaurant.rating}/5&nbsp;
          </label>
          
          {getRatingElement(restaurant.rating)}
        </p>
      </Box>
  );
}

export default RestaurantListItem;