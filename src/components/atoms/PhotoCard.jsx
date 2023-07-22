import PropTypes from "prop-types";
import React from "react";

const PhotoCard = ({ url, title }) => {
  return (
    <>
      <div className="card w-72 max-h-96 lg:max-w-[256px] overflow-hidden shadow-xl hover:scale-150 hover:z-30 hover:shadow-lg transition-all duration-200 group delay-200 object-contain">
        <img src={url} alt="Card" className="w-full object-cover" />
      </div>
    </>
  );
};

PhotoCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PhotoCard;
