import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

function SelectAllNotesOption({ checked, onChange }) {
  return (
    <div className="select-all-notes">
      <div>
        <span>Chọn tất cả</span>
      </div>
      <Checkbox className="select-all-notes__checkbox" checked={checked} onChange={onChange} />
    </div>
  );
}

SelectAllNotesOption.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default SelectAllNotesOption;
