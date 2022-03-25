import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createTempNote } from '../../actions/note';

class SideTab extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    createTempNote: PropTypes.func
  };

  render() {
    const { createTempNote } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 10
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
        </div>
      </div>
    );
  }
}

export default connect(null, { createTempNote })(SideTab);

// chrome://flags/#enable-force-dark
