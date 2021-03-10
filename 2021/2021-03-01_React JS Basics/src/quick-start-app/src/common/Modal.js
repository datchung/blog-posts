function Modal({ children, isActive, setActive }) {
  return (
    <div className={'modal' + (isActive ? ' is-active' : '')}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {children}
      </div>
    <button className="modal-close is-large" 
      aria-label="close"
      onClick={() => setActive(false)} />
    </div>
  );
}

export default Modal;