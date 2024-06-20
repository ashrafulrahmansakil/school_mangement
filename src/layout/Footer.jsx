const Footer = () => {
  let year = new Date();

  return (
    <div className="bg-dark text-white p-1">
      <div className="container text-center">
        <span className="text-capitalize">
          Copyright &copy; {year.getFullYear()} All rights reserved
        </span>
        <p>Powerd by ashraful rahman sakil</p>
      </div>
    </div>
  );
};

export default Footer;
