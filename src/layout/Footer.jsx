

const Footer = () => {
  let year = new Date();

  return (
    <div className="bg-dark text-white p-2">
      <div className="container text-center">
        <span className="text-capitalize">Copyrignt &copy; {year.getFullYear()} All rights reserved </span>
      </div>
    </div>
  );
};

export default Footer;
