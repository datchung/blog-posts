import './RestaurantListItem.css';

// Destructure restaurant from props object
function RestaurantListItem({ restaurant }) {
  function getRatingElement(rating) {
    // Example of conditional rendering
    switch(rating) {
      case '5':
        return <span className="rating-text perfect">Perfection</span>;
      case '4':
        return <span className="rating-text good">Pretty good</span>;
      case '3':
        return <span className="rating-text acceptable">Acceptable</span>;
      default:
        return <span className="rating-text">'Hmmm...'</span>;
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