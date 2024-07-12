import React, { forwardRef } from "react";
import "../../css/Card.css";
const SingleCard = forwardRef((props, ref) => {
  const { cards, labels, language, sectionArea } = props;

  return (
    <div ref={ref}>
      <div className="container-fluid card-container">
        {cards.map((card, index) => (
          <div key={index} className="mx-3" id="card">
            <div className="d-flex ">
              {card.image && (
                <img
                  id="image"
                  className="rounded-5"
                  src={card.image}
                  alt="logo"
                />
              )}
              <strong className="text-center fw-bold m-auto text-uppercase">
                {card.title}
              </strong>
            </div>
            <div>
              <p id="fontSize">{card.institution_name}</p>
              <p>
                {labels[language].exam_name} : {card.exam_name}
              </p>
              <p>
                {labels[language].roll_label} : {card.id}
              </p>
              <p>
                {labels[language].school_class} : {card.school_class}
              </p>
              <p>
                {labels[language].section_label} :
                {sectionArea[language][card.section]}
              </p>
              <p>
                {labels[language].shift_label} : {card.shifts}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SingleCard;
