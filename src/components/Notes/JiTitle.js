import React from 'react';
import PropTypes from 'prop-types';

function JiTitle({ value, onChange }) {
  return (
    <div className="main-tab__title-input">
      <div className="c-title-input">
        <div className="title-text-wrapper">
          <span className="title-text">Title: </span>
        </div>
        <div className="title-input-wrapper">
          <input className="real-input-title" value={value || ''} autoFocus onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

JiTitle.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default JiTitle;
