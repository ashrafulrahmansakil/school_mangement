import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button/Button";
import InputGroup from "../Components/InputGroup/InputGroup";
import Label from "../Components/InputGroup/Label";
import Layout from "./../layout/Layout";
import CheckBox from "./../Components/InputGroup/Checkbox";
import "../css/Input.css";
import "../css/Style.css";

const Login = () => {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formDataValidate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formDataValidate()) {
      console.log(JSON.parse(JSON.stringify(formData)));
      // localStorage.setItem("formData", JSON.stringify(formData));
      setFormData(initialFormData); // Clear the form
    }
  };

  return (
    <div>
      <Layout>
        <div className="container">
          <form
            onSubmit={handleSubmit}
            className="m-auto row g-2 p-4 bg-dangerrow g-1 mb-2 border p-1 w-50 mt-2 m-auto rounded"
          >
            <h2>Log in</h2>
            <div className="col-md-12">
              <Label htmlFor="email" className="form-label" label="Email" />
              <InputGroup
                label="type your email"
                id="email"
                name="email"
                placeholder="Write your email"
                type="email"
                autoComplete="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="col-md-12">
              <Label
                htmlFor="password"
                className="form-label"
                label="Password"
              />
              <InputGroup
                label="what is your password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Write your password"
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              <div className="form-check">
                <CheckBox
                  type="checkbox"
                  id="show"
                  className="form-check-input"
                  onChange={toggleShowPassword}
                />
                <Label
                  htmlFor="show"
                  className="form-check-label"
                  label="Show Password"
                />
              </div>
            </div>
            <div className="col-md-12">
              <Button className="btn btn-success" type="submit" name="Submit" />
            </div>
            <div>
              <span className="d-flex gap-1">
                Not a member?
                <Link to="/signup" className="nav-link">
                  <strong className="loghover"> Sign up</strong>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
