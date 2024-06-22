const Button = ({ name, type, className, ...rest }) => {
  return (
    <>
      <button className={className} {...rest} type={type}>
        {name}
      </button>
    </>
  );
};

export default Button;
