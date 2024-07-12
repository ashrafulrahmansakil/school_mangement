import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Layout from "../../layout/Layout";
import InputGroup from "../InputGroup/InputGroup";
import Label from "../InputGroup/Label";
import Button from "../Button/Button";
import SingleCard from "../SingleCard/SingleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAnglesRight,
  faPrint,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DynamicTextCards = () => {
  // form input initial
  const initialFormState = {
    title: "",
    institution_name: "",
    exam_name: "",
    school_class: "",
    section: "",
    shifts: "",
    image: null,
  };

  // all states
  const [formData, setFormData] = useState(initialFormState);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [errors, setErrors] = useState({});
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [language, setLanguage] = useState("bn");

  // form dynamic labels
  const labels = {
    en: {
      submit: "Submit",
      reset: "Reset",
      language: "Change Language",
      title: "SEAT CARD Title",
      institution_name: "Institution / Organization Name",
      exam_name: "Exam Name",
      school_class: "Class",
      section: "Section",
      shifts: "Shift",
      range_start: "Range Start",
      range_end: "Range End",
      upload_image: "Upload Logo",
      admit_card: "Institution / Organization Exam Seat Card",
      shift_label: "Shift",
      roll_label: "Roll No",
      section_label: "Section",
    },
    bn: {
      submit: "জমা দিন",
      reset: "পুনরায়",
      language: "ভাষা পরিবর্তন",
      title: "সিট কার্ড শিরোনাম",
      institution_name: "প্রতিষ্ঠান / সংস্থার নাম",
      exam_name: "পরীক্ষার নাম",
      school_class: "শ্রেণি",
      section: "শাখা",
      shifts: "শিফট",
      range_start: "সিট কার্ডের শুরু সংখ্যা ",
      range_end: "সিট কার্ডের শেষ সংখ্যা",
      upload_image: "আপলোড লগো",
      admit_card: "প্রতিষ্ঠান / সংস্থার পরীক্ষার সিট কার্ড",
      shift_label: "শিফট",
      roll_label: "রোল",
      section_label: "শাখা",
    },
  };

  // dynamic select section
  const sectionArea = {
    en: {
      x: "Select",
      o: "-",
      a: "A",
      b: "B",
      c: "C",
      d: "D",
      e: "E",
    },
    bn: {
      x: "নির্বাচন করুন",
      o: "-",
      a: "ক",
      b: "খ",
      c: "গ",
      d: "ঘ",
      e: "ঙ",
    },
  };

  // form validation
  const formDataValidate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Seat card title is required";
    if (!formData.institution_name)
      newErrors.institution_name = "Institution name is required";
    if (!formData.exam_name) newErrors.exam_name = "Exam name is required";
    if (!formData.school_class) newErrors.school_class = "Class is required";
    if (!formData.shifts) newErrors.shifts = "Shift is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.section) newErrors.section = "Section is required";
    if (!rangeStart) newErrors.range1 = "Range Start is required";
    if (!rangeEnd) newErrors.range2 = "Range End is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // input value change
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

  //any range
  const handleRangeStartChange = (e) => {
    setRangeStart(e.target.value);
  };
  //any range
  const handleRangeEndChange = (e) => {
    setRangeEnd(e.target.value);
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formDataValidate()) {
      const imageURL = formData.image
        ? URL.createObjectURL(formData.image)
        : null;

      const start = parseInt(rangeStart);
      const end = parseInt(rangeEnd);
      // generated dynamic card
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

  // print button area with 'Ref'
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setRangeStart("");
    setRangeEnd("");
  };

  return (
    <>
      {showForm ? (
        <Layout>
          <div className="container">
            <form
              className="m-auto row g-2 p-2 mb-2 border w-75 mt-2 rounded"
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <div className="row">
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="col-lg-4 col-md-6 col-sm-10">
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
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-3">
                  <Link to="/content" className="nav-link">
                    <Button
                      className="btn btn-success btn-sm"
                      type="button"
                      name="অন্যান্য "
                      icon={<FontAwesomeIcon icon={faAnglesRight} />}
                    />
                  </Link>
                </div>
              </div>
              <h5 className="text-center text-uppercase fw-bolder">
                {labels[language].admit_card}
              </h5>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <Label
                  htmlFor="title"
                  className="form-label"
                  label={labels[language].title}
                />
                <InputGroup
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="on"
                  placeholder={labels[language].title}
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <Label
                  htmlFor="institution_name"
                  className="form-label"
                  label={labels[language].institution_name}
                />
                <InputGroup
                  id="institution_name"
                  name="institution_name"
                  type="text"
                  autoComplete="on"
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
              <div className="col-lg-6 col-md-6 col-sm-12">
                <Label
                  htmlFor="exam_name"
                  className="form-label"
                  label={labels[language].exam_name}
                />
                <InputGroup
                  id="exam_name"
                  name="exam_name"
                  type="text"
                  autoComplete="on"
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
                  autoComplete="on"
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
              <div className="col-lg-6 col-md-6 col-sm-12">
                <Label
                  htmlFor="section"
                  className="form-label"
                  label={labels[language].section}
                />
                <select
                  id="section"
                  value={formData.section}
                  className={`form-select ${
                    errors.section ? "is-invalid" : ""
                  }`}
                  onChange={(e) =>
                    handleInputChange({
                      target: { name: "section", value: e.target.value },
                    })
                  }
                >
                  {Object.keys(sectionArea[language]).map((key) => (
                    <option key={key} value={key}>
                      {sectionArea[language][key]}
                    </option>
                  ))}
                </select>
                {errors.section && (
                  <div className="invalid-feedback">{errors.section}</div>
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
                  autoComplete="on"
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
              <div className="col-md-4">
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
                  autoComplete="on"
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
              <div className="col-md-4">
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
                  autoComplete="on"
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
              <div className="col-md-4">
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
              <div className="col-lg-12 col-md-12 col-sm-12">
                <Button
                  className="btn btn-danger col-md-5 m-1"
                  type="reset"
                  name={labels[language].reset}
                  onClick={handleReset}
                />
                <Button
                  className=" btn btn-primary col-md-5"
                  type="submit"
                  name={labels[language].submit}
                />
              </div>
            </form>
          </div>
        </Layout>
      ) : (
        <>
          <div className="container m-1">
            <div className="btn-group btn-lg mx-5">
              {/* Back to Form */}
              <Button
                onClick={() => setShowForm(true)}
                className="btn btn-primary text-uppercase"
                name="form "
                type="button"
                icon={<FontAwesomeIcon icon={faAngleLeft} />}
              />
              {/* Print document */}
              <Button
                className="btn btn-success print-button text-uppercase"
                type="button"
                label="print"
                icon={<FontAwesomeIcon icon={faFilePdf} />}
              />
              <Button
                onClick={handlePrint}
                className="btn btn-danger print-button text-uppercase"
                type="button"
                label="print"
                icon={<FontAwesomeIcon icon={faPrint} />}
              />
            </div>
          </div>
          <div ref={componentRef}>
            <SingleCard
              cards={cards}
              labels={labels}
              language={language}
              sectionArea={sectionArea}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DynamicTextCards;