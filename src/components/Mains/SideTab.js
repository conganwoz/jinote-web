import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { db } from '../../database/db';
import { createTempNote, fetchNotesFromLocal, selectNote } from '../../actions/note';
import { Account } from '../Users';
import { NotesRender } from '../Notes';

function SideTab({ createTempNote, note, fetchNotesFromLocal, selectNote }) {
  useEffect(async () => {
    const localNotes = await db.notes?.toCollection()?.limit(10)?.toArray();
    fetchNotesFromLocal((localNotes || [])?.filter((item) => !!item));
  }, []);

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
        <div>
          <span style={{ fontSize: 30, fontWeight: 540, float: 'left' }}>My Notes</span>
        </div>

        <div style={{ marginTop: 50, width: '100%' }}>
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

          <NotesRender selectNote={selectNote} notes={note?.noteData?.notes || []} />
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
