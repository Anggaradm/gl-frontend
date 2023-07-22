import PropTypes from "prop-types";
import React from "react";

const RoomNumber = ({ roomNumber, addStyle, ...rest }) => {
  return (
    <>
      <div
        className={`btn text-center text-lg shadow-lg ${addStyle}`}
        {...rest}
      >
        {roomNumber}
      </div>
    </>
  );
};

RoomNumber.propTypes = {
  addStyle: PropTypes.string,
  roomNumber: PropTypes.string,
};

export default RoomNumber;
