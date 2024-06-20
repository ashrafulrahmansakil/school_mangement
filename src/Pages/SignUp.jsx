import { useState } from "react";
import { Link } from "react-router-dom";
import InputGroup from "../Components/InputGroup/InputGroup";
import Layout from "../layout/Layout";
import Label from "./../Components/InputGroup/Label";
import CheckBox from "./../Components/InputGroup/Checkbox";
import TextArea from "./../Components/InputGroup/TextArea";
import Button from "../Components/Button/Button";
import "../css/Input.css";
const SignUp = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    gender: "",
    date: "",
    textarea: "",
    permanentaddress: "",
    presentaddress: "",
    // district: "",
    // upazila: "",
    // termsAccepted: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formDataValidate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.number.trim()) newErrors.number = "Phone number is required";
    if (!formData.date) newErrors.date = "Date of Birth is required";
    if (!formData.presentaddress)
      newErrors.presentaddress = "Present Address is required";
    if (!formData.permanentaddress)
      newErrors.permanentaddress = "Permanent Address is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.textarea.trim()) newErrors.textarea = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formDataValidate()) {
      console.log(JSON.parse(JSON.stringify(formData)));
      // localStorage.setItem("formData", JSON.stringify(formData));
      setFormData(initialFormData); // Clear the form
    }
  };

  // const selectedDistrict = districtData.find(
  //   (district) => district.id === parseInt(formData.district)
  // );
  return (
    <>
      <Layout>
        <div className="container">
          <form
            onSubmit={handleSubmit}
            className="m-auto row g-2 p-4 bg-dangerrow g-1 mb-2 border p-1 w-75 mt-2 m-auto rounded"
          >
            <h1>Sign up </h1>
            <div className="col-md-6">
              <Label
                htmlFor="full_name"
                className="form-label"
                label="Full Name"
              />
              <InputGroup
                id="full_name"
                name="name"
                type="text"
                placeholder="Write a full name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="col-md-6">
              <Label htmlFor="email" className="form-label" label="Email" />
              <InputGroup
                type="email"
                id="email"
                name="email"
                placeholder="Write a email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="col-md-6">
              <Label
                htmlFor="password"
                className="form-label"
                label="Password"
              />
              <InputGroup
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                placeholder="write a password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="col-md-6">
              <Label
                htmlFor="confirmPassword"
                className="form-label"
                label="Confirm Password"
              />
              <InputGroup
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                placeholder="write a confirm password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
              <div className="form-check">
                <CheckBox
                  id="show_password"
                  type="checkbox"
                  className="form-check-input"
                  onChange={toggleShowPassword}
                />
                <Label
                  htmlFor="show_password"
                  className="form-check-label"
                  label="Check password"
                />
              </div>
            </div>
            <div className="col-md-6">
              <Label
                htmlFor="phone_number"
                className="form-label"
                label="Phone number"
              />
              <InputGroup
                id="phone_number"
                type="number"
                name="number"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                value={formData.number}
                onChange={handleChange}
              />
              {errors.number && (
                <div className="invalid-feedback">{errors.number}</div>
              )}
            </div>
            <div className="col-md-6">
              <Label
                htmlFor="date_of_birth"
                className="form-label"
                label="Date of Birth"
              />
              <InputGroup
                id="date_of_birth"
                type="date"
                name="date"
                className={`form-control ${errors.date ? "is-invalid" : ""}`}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <div className="invalid-feedback">{errors.date}</div>
              )}
            </div>
            <div className="col-md-6">
              <Label
                htmlFor="present_address"
                className="form-label"
                label="Present address"
              />
              <TextArea
                id="present_address"
                type="text"
                name="presentaddress"
                className={`form-control ${
                  errors.presentaddress ? "is-invalid" : ""
                }`}
                value={formData.presentaddress}
                onChange={handleChange}
              />
              {errors.presentaddress && (
                <div className="invalid-feedback">{errors.presentaddress}</div>
              )}
            </div>
            <div className="col-md-6">
              <Label
                htmlFor="permanent_address"
                className="form-label"
                label="Permanent address"
              />

              <TextArea
                id="permanent_address"
                type="text"
                name="permanentaddress"
                className={`form-control ${
                  errors.permanentaddress ? "is-invalid" : ""
                }`}
                value={formData.permanentaddress}
                onChange={handleChange}
              />
              {errors.permanentaddress && (
                <div className="invalid-feedback">
                  {errors.permanentaddress}
                </div>
              )}
            </div>

            {/* Gender  start*/}
            <div className="col-md-12">
              <Label className="form-check-label mx-1" label="Gender" />
              <div className="form-check-inline form-check">
                <CheckBox
                  type="radio"
                  className="form-check-input"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />
                <Label
                  className="form-check-label"
                  htmlFor="male"
                  label="Male"
                />
              </div>
              <div className="form-check-inline form-check">
                <CheckBox
                  type="radio"
                  className="form-check-input"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />
                <Label
                  className="form-check-label"
                  htmlFor="female"
                  label="Female"
                />
              </div>
              <div className="form-check-inline form-check">
                <CheckBox
                  type="radio"
                  className="form-check-input"
                  id="other"
                  name="gender"
                  value="other"
                  onChange={handleChange}
                />
                <Label
                  className="form-check-label"
                  htmlFor="other"
                  label="Other"
                />
              </div>
              {/* Gender  end*/}
            </div>
            <div className="col-md-12">
              <Label
                htmlFor="text_area"
                className="form-label"
                label="write a message"
              />
              <TextArea
                rows="4"
                id="text_area"
                name="textarea"
                placeholder="write a something ...."
                className={`form-control ${
                  errors.textarea ? "is-invalid" : ""
                }`}
                value={formData.textarea}
                onChange={handleChange}
              />
              {errors.textarea && (
                <div className="invalid-feedback">{errors.textarea}</div>
              )}
            </div>
            <div className="form-check">
              <CheckBox
                type="checkbox"
                className="form-check-input"
                id="checkmark"
              />
              <Label
                className="form-check-label"
                htmlFor="checkmark"
                label="All condition are right"
              />
            </div>
            <div className="col-md-12">
              <Button
                className="mx-1 text-capitalize btn btn-danger"
                type="reset"
                name="reset"
              />
              <Button
                className="btn btn-success  text-capitalize"
                type="submit"
                name="submit"
              />
            </div>
            <div>
              <Link to="/login" className="nav-link">
                already a create a account <strong>login</strong> please
              </Link>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SignUp;
