import './RestaurantListItem.css';

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
    <div className="restaurant">
      <div className="name">{restaurant.name}</div>
      <div className="rating">
        {restaurant.rating}/5 -
        {getRatingElement(restaurant.rating)}
      </div>
    </div>
  );
}

export default RestaurantListItem;