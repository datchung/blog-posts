function Modal({ children, isActive, setInactive }) {
  return (
    <div className={'modal' + (isActive ? ' is-active' : '')}>
      <div className="modal-background"
        onClick={setInactive}></div>
      <div className="modal-content">
        {children}
      </div>
    <button className="modal-close is-large" 
      aria-label="close"
      onClick={setInactive} />
    </div>
  );
}

export default Modal;