import React from 'react';
import PropTypes from 'prop-types';

import NoteItem from './NoteItem';

function NotesRender({ notes, selectNote, selectedNoteIds, changeSelectedNote }) {
  return (
    <div className="note-item-container">
      {notes?.map((item, index) => {
        return (
          <NoteItem
            item={item}
            key={index}
            selectNote={selectNote}
            selectedNoteIds={selectedNoteIds}
            changeSelectedNote={changeSelectedNote}
          />
        );
      })}
    </div>
  );
}

NotesRender.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  selectNote: PropTypes.func,
  selectedNoteIds: PropTypes.arrayOf(PropTypes.number),
  changeSelectedNote: PropTypes.func
};

export default NotesRender;
