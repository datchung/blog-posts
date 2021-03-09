function Box({ children, title, subtitle}) {
  return (
    <div className="box mt-5">
        {title ? <p className="title is-3">{title}</p> : ''}
        {subtitle ? <p className="subtitle is-5">{subtitle}</p> : ''}
        {children}
      </div>
  );
}
  
export default Box;