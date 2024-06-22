const Button = ({ name, type, icon, text, className, ...rest }) => {
  return (
    <>
      <button className={className} {...rest} type={type}>
        {name}
        {icon && <span className="btn-icon">{icon}</span>}
        {text}
      </button>
    </>
  );
};

export default Button;
