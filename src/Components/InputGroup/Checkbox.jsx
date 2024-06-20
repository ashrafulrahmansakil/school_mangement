const CheckBox = ({ type, value, name, className, id ,...rest}) => {
  return (
    <>
      <input type={type} value={value} name={name} id={id} className={className} {...rest}/>
    </>
  );
};

export default CheckBox;
