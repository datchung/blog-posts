import { useState } from 'react';

// Import common components
import Modal from '../common/Modal';
import Box from '../common/Box';

function RestaurantPicker({ selectedRestaurants }) {
  const [isModalActive, setModalActive] = useState(false);
  const [pickedRestaurant, setPickedRestaurant] = useState('');

  function getMessage(selectedCount) {
    switch(selectedCount) {
      case 0:
        return 'Select two or more restaurants to begin the random restaurant picker.';
      case 1:
        return 'Select one more restaurant to begin the random restaurant picker.';
      default:
        return <button className="button is-small" onClick={pickRestaurant}>Pick a restaurant now</button>;
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function pickRestaurant() {
    var index = getRandomInt(selectedRestaurants.length);
    console.log(`${selectedRestaurants[index]}`);
    setPickedRestaurant(selectedRestaurants[index]);
    setModalActive(true);
  }

  return (
    <>
      <article className="message is-info is-small mt-5">
        <div className="message-body">
          {getMessage(selectedRestaurants.length)}
        </div>
      </article>
      <Modal isActive={isModalActive} setActive={setModalActive}>
        <Box>How about {pickedRestaurant}?</Box>
      </Modal>
    </>
  );
}

export default RestaurantPicker;