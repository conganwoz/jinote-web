import React from 'react';
import PropTypes from 'prop-types';

import { SideBarMenu } from '../Menu';

function SideTabHeader({ selectedNotes }) {
  return (
    <div className="l-side-tab__menu">
      <div className="menu__header">
        <span className="menu__header-text">My Notes</span>
      </div>
      <div>
        <SideBarMenu selectedNotes={selectedNotes} />
      </div>
    </div>
  );
}

SideTabHeader.propTypes = {
  selectedNotes: PropTypes.array
};

export default SideTabHeader;
