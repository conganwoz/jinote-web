import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Checkbox } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';

import { createTempNote, fetchNotesFromLocal, selectNote } from '../../actions/note';
import { getLatestNotes } from '../../utils/database';

import { Account } from '../Users';
import { NotesRender } from '../Notes';
import { SideBarMenu } from '../Menu';

function SideTab({ createTempNote, note, fetchNotesFromLocal, selectNote }) {
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);

  useEffect(async () => {
    const localNotes = await getLatestNotes(10);
    fetchNotesFromLocal((localNotes || [])?.filter((item) => !!item));
  }, []);

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

  const onChangeCheckedAllStatus = () => {
    if (isCheckedAll()) setSelectedNoteIds([]);
    else setSelectedNoteIds((note?.noteData?.notes || [])?.map((item) => item?.id));
  };

  const selectedNotes = (note?.noteData?.notes || []).filter((item) =>
    selectedNoteIds?.includes(item?.id)
  );

  return (
    <>
      <div className="l-side-tab">
        <div className="l-side-tab__menu">
          <div className="menu__header">
            <span className="menu__header-text">My Notes</span>
          </div>
          <div>
            <SideBarMenu selectedNotes={selectedNotes} />
          </div>
        </div>

        <div className="select-all-notes">
          <div>
            <span>Chọn tất cả</span>
          </div>
          <Checkbox
            className="select-all-notes__checkbox"
            checked={isCheckedAll()}
            onChange={onChangeCheckedAllStatus}
          />
        </div>

        <div className="notes-container">
          <div onClick={createTempNote} className="btn-create-note add_new_note">
            <div>
              <AiOutlinePlus className="btn-create-note__icon" />
            </div>
            <div className="btn-create-note__text">
              <span className="btn-create-note__inner-text">Add new note</span>
            </div>
          </div>

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
