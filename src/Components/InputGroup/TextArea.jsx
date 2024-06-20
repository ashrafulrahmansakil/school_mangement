const TextArea = ({ name, id, className, ...rest }) => {
  return (
    <>
      <textarea name={name} className={className} {...rest} id={id}></textarea>
    </>
  );
};
export default TextArea;
