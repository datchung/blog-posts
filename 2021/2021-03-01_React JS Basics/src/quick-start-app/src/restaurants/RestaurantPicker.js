
function RestaurantPicker({ selectedRestaurants }) {
  function getMessage(selectedCount) {
    switch(selectedCount) {
      case 0:
        return 'Select two or more restaurants to begin the random restaurant picker!';
      case 1:
        return 'One restaurant selected. Select another restaurant to begin the random restaurant picker!';
      default:
        return `${selectedCount} restaurants selected. Start random restaurant picker now.`;
    }    
  }

  return (
    <>
      {getMessage(selectedRestaurants.length)}
    </>
  );
}

export default RestaurantPicker;