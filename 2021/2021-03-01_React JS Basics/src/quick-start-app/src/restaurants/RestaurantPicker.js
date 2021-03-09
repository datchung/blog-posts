
function RestaurantPicker({ selectedRestaurants }) {
  function getMessage(selectedCount) {
    switch(selectedCount) {
      case 0:
        return 'Select two or more restaurants to begin the random restaurant picker.';
      case 1:
        return 'Select one more restaurant to begin the random restaurant picker.';
      default:
        return <button className="button is-small">Pick a restaurant now</button>;
    }
  }

  return (
    <article className="message is-info is-small mt-5">
      <div className="message-body">
        {getMessage(selectedRestaurants.length)}
      </div>
    </article>
  );
}

export default RestaurantPicker;