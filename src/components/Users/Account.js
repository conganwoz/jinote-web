import React from 'react';
import Avatar from 'boring-avatars';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { generateAnimalName } from '../../utils/name';
import { authenticate } from '../../actions/user';

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = generateAnimalName();
    return (
      <div style={{ width: '95%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 10
          }}>
          <Avatar
            size={40}
            name="Maria Mitchell"
            variant="marble"
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
          />
          <div style={{ marginLeft: 10 }}>
            <div>
              <span style={{ float: 'left' }}>{name}</span>
            </div>
            <div>
              <span style={{ float: 'left', fontSize: 10, color: '#8c8c8c' }}>anonymous</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const structuredSelector = createStructuredSelector({
  user: (state) => state.user
});

export default connect(structuredSelector, { authenticate })(Account);
