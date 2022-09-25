import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';

function CreateNewNoteButton({ createTempNote }) {
  return (
    <div onClick={createTempNote} className="btn-create-note add_new_note">
      <div>
        <AiOutlinePlus className="btn-create-note__icon" />
      </div>
      <div className="btn-create-note__text">
        <span className="btn-create-note__inner-text">Add new note</span>
      </div>
    </div>
  );
}

CreateNewNoteButton.propTypes = {
  createTempNote: PropTypes.func
};

export default CreateNewNoteButton;
