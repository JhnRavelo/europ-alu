import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field } from "formik";
import { useRef } from "react";
import propsTypes from "prop-types";

const ListCheckboxField = ({ type, arrays, title, name }) => {
  const btnListRef = useRef();
  const typeRef = useRef();

  const handleListClick = () => {
    const btnList = btnListRef.current;
    const typeList = typeRef.current;
    btnList.classList.toggle("open");
    typeList.classList.toggle("open");
  };
  return (
    <div className="item">
      <div className="menu-deroulant">
        <label>{title}</label>

        <div className="container">
          <div
            className="select-btn"
            ref={btnListRef}
            onClick={handleListClick}
          >
            <span className="btn-text">{type && type}</span>
            <span className="arrow-dwn">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="fa-solid fa-chevron-down"
              />
            </span>
          </div>
          <ul className="list-type" ref={typeRef}>
            {arrays && arrays.map((array, index) => (
              <label className="type" key={index}>
                <Field
                  className="checkbox"
                  type="checkbox"
                  name={name}
                  value={array}
                />
                <span className="item-text">{array}</span>
              </label>
            ))}
          </ul>
          <ErrorMessage name={name} component={"p"} className="error" />
        </div>
      </div>
    </div>
  );
};

ListCheckboxField.propsTypes = {
  type: propsTypes.object,
  arrays: propsTypes.array,
  title: propsTypes.string,
  name: propsTypes.string,
};

export default ListCheckboxField;
