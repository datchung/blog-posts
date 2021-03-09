// Import common components
import Back from '../common/Back';
import Box from '../common/Box';

function RestaurantItemPage({location, history}) {
  return (
    <>
      {/*Back button*/}
      <Back history={history} />

      <Box title={location.state.restaurant.name}
        subtitle={"Rating: " + location.state.restaurant.rating}>
        <p>{location.state.restaurant.description}</p>
      </Box>
    </>
  );
}

export default RestaurantItemPage;