
function RestaurantPicker({ selectedRestaurants }) {
  function getMessage(selectedCount) {
    switch(selectedCount) {
      case 0:
        return 'Select two or more restaurants to begin the random restaurant picker.';
      case 1:
        return 'Select one more restaurant to begin the random restaurant picker.';
      default:
        return `${selectedCount} restaurants selected. Pick a restaurant now.`;
    }    
  }

  return (
    <article className="message is-info mt-5">
      <div className="message-body">
        {getMessage(selectedRestaurants.length)}
      </div>
    </article>
  );
}

export default RestaurantPicker;