const InputGroup = ({
  name,
  value,
  type,
  id,
  className,
  placeholder,
  autoComplete,
  onFocus,
  onBlur,
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
        placeholder={placeholder ?? ""}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />
    </>
  );
};

export default InputGroup;
