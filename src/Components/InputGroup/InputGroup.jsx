const InputGroup = ({
  name,
  value,
  type,
  id,
  className,
  placeholder,
  autoComplete,
  ...rest
}) => {
  return (
    <>
      <input
        className={className}
        id={id}
        value={value}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
};

export default InputGroup;
