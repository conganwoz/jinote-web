import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { AiOutlineCloudSync } from 'react-icons/ai';

function NotesRender({ notes, selectNote, selectedNoteIds, changeSelectedNote }) {
  return (
    <div>
      {notes?.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 10,
              background: 'rgba(204,204,204,0.3)',
              cursor: 'pointer',
              marginTop: 10
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flexGrow: 1
              }}
              onClick={() => {
                selectNote(item);
              }}>
              <div>
                <span>{item?.title || ''}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}>
                <div>
                  <span style={{ fontSize: 10 }}>{item?.insertedAt || ''}</span>
                </div>
                {item?.cloudId ? (
                  <AiOutlineCloudSync style={{ color: '#434343', marginLeft: 10, fontSize: 20 }} />
                ) : null}
              </div>
            </div>
            <Checkbox
              checked={selectedNoteIds?.includes(item?.id)}
              onChange={() => {
                changeSelectedNote(item?.id);
              }}
            />
          </div>
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
