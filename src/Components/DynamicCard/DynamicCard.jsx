import React, { useState } from "react";
import "../../css/DynamicTextCards.css";
import Layout from "../../layout/Layout";
import InputGroup from "../InputGroup/InputGroup";
import Label from "../InputGroup/Label";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
const DynamicTextCards = () => {
  const initialFormState = {
    title: "",
    institution_name: "",
    exam_name: "",
    school_class: "",
    shifts: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [errors, setErrors] = useState({});
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [language, setLanguage] = useState("bn");

  const labels = {
    en: {
      language: "Change Language",
      title: "SEAT CARD Name",
      institution_name: "Institution Name",
      exam_name: "Exam Name",
      school_class: "Class",
      shifts: "Shift",
      range_start: "Range Start",
      range_end: "Range End",
      upload_image: "Upload Image",
      admit_card: "Seat Card",
      print_margin:
        "*** N.B. For Printing, Set Custom Margin (Top-Bottom 0.20, Left-Right 0 ) ***",
      shift_label: "Shift:",
      roll_label: "Roll",
      date: "Date",
    },
    bn: {
      language: "ভাষা পরিবর্তন",
      title: "সিট কার্ড নাম",
      institution_name: "প্রতিষ্ঠানের নাম",
      exam_name: "পরীক্ষার নাম",
      school_class: "শ্রেণি",
      shifts: "শিফট",
      range_start: "সিট কার্ডের সংখ্যা শুরু",
      range_end: "সিট কার্ডের সংখ্যা শেষ",
      upload_image: "আপলোড ইমেজ",
      admit_card: "সিট কার্ড",
      print_margin:
        "*** বি: দ্র: প্রিন্টের সময় মার্জিন কাস্টম দিতে হবে (উপরে-নিচে ০.২০, বামে-ডানে ০ ) ***",
      shift_label: "শিফট:",
      roll_label: "রোল",
      date: "তারিখ",
    },
  };

  const formDataValidate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Seat card name is required";
    if (!formData.institution_name)
      newErrors.institution_name = "Institution name is required";
    if (!formData.exam_name) newErrors.exam_name = "Exam name is required";
    if (!formData.school_class) newErrors.school_class = "Class is required";
    if (!formData.shifts) newErrors.shifts = "Shift is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!rangeStart) newErrors.range1 = "Range Start are required";
    if (!rangeEnd) newErrors.range2 = "Range End are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrint = () => {
    document.querySelector(".print-button").classList.add("hide-for-print");
    // document.querySelector(".download-button").classList.add("hide-for-print");

    window.print();

    // Remove the class after printing
    document.querySelector(".print-button").classList.remove("hide-for-print");
    // document.querySelector(".download-button").classList.remove("hide-for-print");
  };

  // const handleDownload = () => {

  // };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRangeStartChange = (e) => {
    setRangeStart(e.target.value);
  };

  const handleRangeEndChange = (e) => {
    setRangeEnd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formDataValidate()) {
      const imageURL = formData.image
        ? URL.createObjectURL(formData.image)
        : null;

      const start = parseInt(rangeStart);
      const end = parseInt(rangeEnd);

      const generatedCards = [];
      for (let i = start; i <= end; i++) {
        generatedCards.push({
          ...formData,
          id: String(i).padStart(4, "0"), // 4-digit ID with leading zeros
          image: imageURL,
        });
      }

      setCards(generatedCards);
      setShowForm(false);
    }
  };

  // let date = new Date().toJSON().slice(0, 10);
  let date = new Date();
  return (
    <>
      {showForm ? (
        <Layout>
          <div className="container">
            <form
              className="m-auto row g-2 p-4 bg-dangerrow g-1 mb-2 border p-1 w-75 mt-2 m-auto rounded"
              onSubmit={handleSubmit}
            >
              <div className="col-md-4">
                <Label
                  htmlFor="language"
                  className="form-label"
                  label={labels[language].language}
                />
                <select
                  className="form-select"
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="bn">Bangla</option>
                </select>
              </div>
              <h3 className="text-center text-uppercase">
                {labels[language].admit_card}
              </h3>
              <strong className="text-danger text-center fst-italic fw-bolder">
                {labels[language].print_margin}
              </strong>
              <div className="col-md-6">
                <Label
                  htmlFor="title"
                  className="form-label"
                  label={labels[language].title}
                />
                <InputGroup
                  id="title"
                  name="title"
                  type="text"
                  placeholder={labels[language].title}
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>
              <div className="col-md-6">
                <Label
                  htmlFor="institution_name"
                  className="form-label"
                  label={labels[language].institution_name}
                />
                <InputGroup
                  id="institution_name"
                  name="institution_name"
                  type="text"
                  placeholder={labels[language].institution_name}
                  className={`form-control ${
                    errors.institution_name ? "is-invalid" : ""
                  }`}
                  value={formData.institution_name}
                  onChange={handleInputChange}
                />
                {errors.institution_name && (
                  <div className="invalid-feedback">
                    {errors.institution_name}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <Label
                  htmlFor="exam_name"
                  className="form-label"
                  label={labels[language].exam_name}
                />
                <InputGroup
                  id="exam_name"
                  name="exam_name"
                  type="text"
                  placeholder={labels[language].exam_name}
                  className={`form-control ${
                    errors.exam_name ? "is-invalid" : ""
                  }`}
                  value={formData.exam_name}
                  onChange={handleInputChange}
                />
                {errors.exam_name && (
                  <div className="invalid-feedback">{errors.exam_name}</div>
                )}
              </div>
              <div className="col-md-6">
                <Label
                  htmlFor="school_class"
                  className="form-label"
                  label={labels[language].school_class}
                />
                <InputGroup
                  id="school_class"
                  name="school_class"
                  type="text"
                  placeholder={labels[language].school_class}
                  className={`form-control ${
                    errors.school_class ? "is-invalid" : ""
                  }`}
                  value={formData.school_class}
                  onChange={handleInputChange}
                />
                {errors.school_class && (
                  <div className="invalid-feedback">{errors.school_class}</div>
                )}
              </div>
              <div className="col-md-6">
                <Label
                  htmlFor="shifts"
                  className="form-label"
                  label={labels[language].shifts}
                />
                <InputGroup
                  id="shifts"
                  name="shifts"
                  type="text"
                  placeholder={labels[language].shifts}
                  className={`form-control ${
                    errors.shifts ? "is-invalid" : ""
                  }`}
                  value={formData.shifts}
                  onChange={handleInputChange}
                />
                {errors.shifts && (
                  <div className="invalid-feedback">{errors.shifts}</div>
                )}
              </div>
              <div className="col-md-6">
                <Label
                  htmlFor="range_start"
                  className="form-label"
                  label={labels[language].range_start}
                />
                <InputGroup
                  id="range_start"
                  name="range_start"
                  type="number"
                  min="0"
                  placeholder={labels[language].range_start}
                  className={`form-control ${
                    errors.range1 ? "is-invalid" : ""
                  }`}
                  value={rangeStart}
                  onChange={handleRangeStartChange}
                />
                {errors.range1 && (
                  <div className="invalid-feedback">{errors.range1}</div>
                )}
              </div>
              <div className="col-md-6">
                <Label
                  htmlFor="range_end"
                  className="form-label"
                  label={labels[language].range_end}
                />
                <InputGroup
                  id="range_end"
                  name="range_end"
                  type="number"
                  min="0"
                  placeholder={labels[language].range_end}
                  className={`form-control ${
                    errors.range2 ? "is-invalid" : ""
                  }`}
                  value={rangeEnd}
                  onChange={handleRangeEndChange}
                />
                {errors.range2 && (
                  <div className="invalid-feedback">{errors.range2}</div>
                )}
              </div>
              <div className="col-md-6">
                <Label
                  htmlFor="imageFile"
                  className="form-label"
                  label={labels[language].upload_image}
                />
                <InputGroup
                  id="imageFile"
                  name="image"
                  type="file"
                  accept="image/*"
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                  onChange={handleInputChange}
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}
              </div>
              <div className="col-md-12 ">
                <Button
                  className="btn btn-danger col-md-5 mx-1"
                  type="reset"
                  name="Reset"
                />
                <Button
                  className=" btn btn-primary col-md-6"
                  type="submit"
                  name="submit"
                />
              </div>
            </form>
          </div>
        </Layout>
      ) : (
        <>
          <div className="container mx-5 mt-1">
            <Button
              onClick={handlePrint}
              className="btn btn-danger print-button text-uppercase"
              type="button"
              icon={<FontAwesomeIcon icon={faPrint} />}
            />
          </div>
          <div className="container card-container margin">
            {cards.map((card, index) => (
              <div key={index} id="card">
                <div className=" bg-light-subtle">
                  <div className="d-flex ">
                    {card.image && (
                      <img id="image" src={card.image} alt="logo" />
                    )}
                    <strong className="text-center fw-bold m-auto text-uppercase">
                      {card.title}
                    </strong>
                  </div>
                  <p id="fontSize">{card.institution_name}</p>
                  <p>
                    {labels[language].exam_name}: {card.exam_name}
                  </p>
                  <p>
                    {labels[language].roll_label}: {card.id}
                  </p>
                  <p>
                    {labels[language].school_class}: {card.school_class}
                  </p>
                  <p>
                    {labels[language].shifts}: {card.shifts}
                  </p>
                  <p>
                    {labels[language].date}: {date.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DynamicTextCards;
