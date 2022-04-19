import React from 'react';
import PropTypes from 'prop-types';

class NotesRender extends React.Component {
  static propTypes = {
    notes: PropTypes.object
  };
  render() {
    const { notes } = this.props;
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
              }}>
              <div>
                <span>{item?.title || ''}</span>
              </div>
              <div>
                <span style={{ fontSize: 10 }}>{item?.createdAt || ''}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default NotesRender;
