import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

import { db } from '../../database/db';
import { createTempNote, fetchNotesFromLocal, selectNote } from '../../actions/note';
import { Account } from '../Users';
import { NotesRender } from '../Notes';
import { SideBarMenu } from '../Menu';

function SideTab({ createTempNote, note, fetchNotesFromLocal, selectNote }) {
  const [selectedNoteIds, setSelectedNoteId] = useState([]);
  useEffect(async () => {
    const localNotes = await db.notes?.toCollection()?.limit(10)?.toArray();
    fetchNotesFromLocal((localNotes || [])?.filter((item) => !!item));
  }, []);

  const changeSelectedNote = (noteId) => {
    const index = selectedNoteIds?.findIndex((item) => item == noteId);

    if (index != -1) {
      setSelectedNoteId(selectedNoteIds.filter((item) => item != noteId));
    } else setSelectedNoteId(selectedNoteIds.concat([noteId]));
  };

  const isCheckAll = () => {
    for (let item of note?.noteData?.notes || []) {
      if (!selectedNoteIds.includes(item?.id)) return false;
    }

    return true;
  };

  const onChangCheckAll = () => {
    const isAll = isCheckAll();

    if (isAll) setSelectedNoteId([]);
    else setSelectedNoteId((note?.noteData?.notes || [])?.map((item) => item?.id));
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 10,
          width: '95%',
          flexGrow: 1
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
          <div style={{ flexGrow: 1, flex: 1 }}>
            <span style={{ fontSize: 30, fontWeight: 540, float: 'left' }}>My Notes</span>
          </div>
          <div>
            <SideBarMenu
              selectedNotes={(note?.noteData?.notes || []).filter((item) =>
                selectedNoteIds?.includes(item?.id)
              )}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            marginTop: 50
          }}>
          <div>
            <span>Chọn tất cả</span>
          </div>
          <Checkbox style={{ marginLeft: 10 }} checked={isCheckAll()} onChange={onChangCheckAll} />
        </div>

        <div style={{ width: '100%', marginTop: 10 }}>
          <div
            onClick={createTempNote}
            className="add_new_note"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 10,
              background: 'rgba(204,204,204,0.3)',
              cursor: 'pointer'
            }}>
            <div>
              <AiOutlinePlus style={{ fontSize: 30 }} />
            </div>
            <div style={{ flexGrow: 1, marginLeft: 20 }}>
              <span style={{ float: 'left' }}>Add new note</span>
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

// chrome://flags/#enable-force-dark
