import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { GoNote } from 'react-icons/go';
import { isEqual } from 'lodash';
import ReactLoading from 'react-loading';

import { createTempNote, clearCurrentNote } from '../../actions/note';

class MainTab extends React.Component {
  constructor(props) {
    super(props);
    this.currentEditor = null;
    this.state = {
      currentNote: null,
      isStartingTinyMCE: false
    };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    const { note } = this.props;

    if (!isEqual(note?.currentNote, prevProps?.note?.currentNote)) {
      this.setState({
        currentNote: note?.currentNote ? { ...note?.currentNote } : null,
        isStartingTinyMCE: !!note?.currentNote
      });
    }
  }

  static propTypes = {
    note: PropTypes.object,
    clearCurrentNote: PropTypes.func
  };

  saveContent = (e) => {
    e?.preventDefault();
    console.log('data__', this.currentEditor?.getContent());
  };

  render() {
    const { clearCurrentNote } = this.props;
    const { currentNote, isStartingTinyMCE } = this.state;

    if (!currentNote)
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <GoNote style={{ fontSize: 300, color: 'rgba(153,153,153,0.2)' }} />
        </div>
      );

    return (
      <div>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
            <div style={{ marginLeft: 10 }}>
              <span style={{ fontWeight: 700, fontStyle: 'italic' }}>Title: </span>
            </div>
            <div style={{ flexGrow: 1 }}>
              <input
                style={{
                  width: '90%',
                  border: 'none',
                  outline: 'none',
                  padding: 10,
                  fontSize: 15
                }}
                defaultValue={currentNote?.title}
                autoFocus
              />
            </div>
          </div>
        </div>
        {isStartingTinyMCE ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10
            }}>
            <ReactLoading type="cylon" color="#ccc" />
          </div>
        ) : null}
        <Editor
          apiKey="5qvottucgw0p2qz0k8b0z8b6rp866s1yt3v2k6mjamp86cvv"
          onInit={(evt, editor) => {
            console.log('in_here__');
            this.currentEditor = editor;
            this.setState({ isStartingTinyMCE: false });
          }}
          initialValue="<h1><strong>What's next?</strong></h1>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 10
          }}>
          <div
            onClick={clearCurrentNote}
            className="clear-btn"
            style={{ padding: 10, background: '#cf1322', marginRight: 10, cursor: 'pointer' }}>
            <span style={{ color: '#fff' }}>Clear</span>
          </div>
          <div
            className="save-btn"
            style={{ padding: 10, background: '#0050b3', cursor: 'pointer', marginRight: 10 }}
            onClick={this.saveContent}>
            <span style={{ color: '#fff' }}>Save</span>
          </div>
        </div>
      </div>
    );
  }
}

const structuredSelector = createStructuredSelector({
  note: (state) => state.note
});

export default connect(structuredSelector, { createTempNote, clearCurrentNote })(MainTab);
