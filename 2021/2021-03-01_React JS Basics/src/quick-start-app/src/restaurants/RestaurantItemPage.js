function RestaurantItemPage({location}) {
  return (
    <div className="box mt-5">
        <p className="title is-3">{location.state.restaurant.name}</p>
        <p className="subtitle is-5">Rating: {location.state.restaurant.rating}/5</p>
        <p>{location.state.restaurant.description}</p>
      </div>
  );
}

export default RestaurantItemPage;