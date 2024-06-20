const Button = ({name, type,className }) => {
  return (
    <>
      <button className={className} type={type}>
        {name}
      </button>
    </>
  );
};

export default Button;
