import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./reserve.css";

export const Reserve = ({ setOpen, hotelId }) => {
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
    </div>
  );
};
