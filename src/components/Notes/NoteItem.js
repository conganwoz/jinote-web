import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { AiOutlineCloudSync } from 'react-icons/ai';

function Title({ title }) {
  return (
    <div>
      <span>{title}</span>
    </div>
  );
}

function MetaInfo({ isSynced, insertedAt }) {
  return (
    <div className="c-notes__meta_info">
      <div>
        <span className="note-created_time">{insertedAt || ''}</span>
      </div>
      {isSynced ? <AiOutlineCloudSync className="synced-icon" /> : null}
    </div>
  );
}

MetaInfo.propTypes = {
  isSynced: PropTypes.bool,
  insertedAt: PropTypes.string
};

Title.propTypes = {
  title: PropTypes.string
};

function NoteItem({ item, selectNote, selectedNoteIds, changeSelectedNote }) {
  return (
    <div className="c-notes">
      <div className="c-notes__item" onClick={() => selectNote(item)}>
        <Title title={item?.title || ''} />
        <MetaInfo isSynced={Boolean(item.cloudId)} insertedAt={item?.insertedAt} />
      </div>
      <Checkbox
        checked={selectedNoteIds?.includes(item?.id)}
        onChange={() => changeSelectedNote(item?.id)}
      />
    </div>
  );
}

NoteItem.propTypes = {
  item: PropTypes.object,
  selectNote: PropTypes.func,
  selectedNoteIds: PropTypes.arrayOf(PropTypes.number),
  changeSelectedNote: PropTypes.func
};

export default NoteItem;
