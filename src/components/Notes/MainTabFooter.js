import React from 'react';
import PropTypes from 'prop-types';

function MainTabFooter({ clearCurrentNote, onSave }) {
  return (
    <div className="main-tab__footer">
      <div onClick={clearCurrentNote} className="clear-btn-normal-state clear-btn">
        <span className="white-text">Clear</span>
      </div>
      <div className="save-text-normal-state save-btn" onClick={onSave}>
        <span className="white-text">Save</span>
      </div>
    </div>
  );
}

MainTabFooter.propTypes = {
  clearCurrentNote: PropTypes.func,
  onSave: PropTypes.func
};

export default MainTabFooter;
