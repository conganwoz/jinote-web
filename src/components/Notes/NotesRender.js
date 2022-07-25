import React from 'react';
import PropTypes from 'prop-types';

function NotesRender({ notes, selectNote }) {
  return (
    <div>
      {notes?.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              padding: 10,
              background: 'rgba(204,204,204,0.3)',
              cursor: 'pointer',
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
            onClick={() => {
              selectNote(item);
            }}>
            <div>
              <span>{item?.title || ''}</span>
            </div>
            <div>
              <span style={{ fontSize: 10 }}>{item?.insertedAt || ''}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

NotesRender.propTypes = {
  notes: PropTypes.object,
  selectNote: PropTypes.func
};

export default NotesRender;
