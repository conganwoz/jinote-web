import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createTempNote, fetchNotesFromLocal, selectNote } from '../../actions/note';

import { Account } from '../Users';
import { NotesRender, CreateNewNoteButton, SelectAllNotesOption, SideTabHeader } from '../Notes';

function SideTab({ createTempNote, note, fetchNotesFromLocal, selectNote }) {
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);

  useEffect(() => fetchNotesFromLocal(), []);

  const changeSelectedNote = (noteId) => {
    const index = selectedNoteIds?.findIndex((item) => item == noteId);

    if (index != -1) setSelectedNoteIds(selectedNoteIds.filter((item) => item != noteId));
    else setSelectedNoteIds(selectedNoteIds.concat([noteId]));
  };

  const isCheckedAll = () => {
    for (let item of note?.noteData?.notes || [])
      if (!selectedNoteIds.includes(item?.id)) return false;

    return true;
  };

  const onChangeCheckedAllNotesStatus = () => {
    if (isCheckedAll()) setSelectedNoteIds([]);
    else setSelectedNoteIds((note?.noteData?.notes || [])?.map((item) => item?.id));
  };

  const selectedNotes = (note?.noteData?.notes || []).filter((item) =>
    selectedNoteIds?.includes(item?.id)
  );

  return (
    <>
      <div className="l-side-tab">
        <SideTabHeader selectedNotes={selectedNotes} />

        <SelectAllNotesOption checked={isCheckedAll()} onChange={onChangeCheckedAllNotesStatus} />

        <div className="notes-container">
          <CreateNewNoteButton createTempNote={createTempNote} />

          <NotesRender
            selectNote={selectNote}
            notes={note?.noteData?.notes || []}
            changeSelectedNote={changeSelectedNote}
            selectedNoteIds={selectedNoteIds}
          />
        </div>
      </div>
      <Account />
    </>
  );
}

const structuredSelector = createStructuredSelector({
  note: (state) => state.note
});

SideTab.propTypes = {
  createTempNote: PropTypes.func,
  note: PropTypes.object,
  fetchNotesFromLocal: PropTypes.func,
  selectNote: PropTypes.func
};

export default connect(structuredSelector, { createTempNote, fetchNotesFromLocal, selectNote })(
  SideTab
);
