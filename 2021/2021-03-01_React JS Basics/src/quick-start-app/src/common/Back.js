// Destructure history from props object
function Back({ history }) {
  function onBackClick() {
    history.goBack();
  }
  
  return (
  <div className="columns mt-5">
    <div className="column">
      <button
        className="button is-small"
        onClick={() => onBackClick()}>
        Back
      </button>
    </div>
  </div>
  );
}

export default Back;