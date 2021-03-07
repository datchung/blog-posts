import './RestaurantListItem.css';

// Destructure restaurant from props object
function RestaurantListItem({ restaurant }) {
  function getRatingText(rating) {
    switch(rating) {
      case '5':
        return 'Perfection';
      case '4':
        return 'Pretty good';
      case '3':
        return 'Acceptable';
      default:
        return 'Hmmm...';
    }
  }

  return (
    <div className="restaurant">
      <div className="name">{restaurant.name}</div>
      <div className="rating">
        {restaurant.rating}/5 -
        <span className="rating-text">{getRatingText(restaurant.rating)}</span>
      </div>
    </div>
  );
}

export default RestaurantListItem;