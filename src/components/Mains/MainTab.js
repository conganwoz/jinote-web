import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { GoNote } from 'react-icons/go';
import { isEqual } from 'lodash';
import ReactLoading from 'react-loading';
import dayjs from 'dayjs';

import { createTempNote, clearCurrentNote, saveNote } from '../../actions/note';

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
  componentDidUpdate(prevProps) {
    const { note } = this.props;

    if (!isEqual(note?.currentNote, prevProps?.note?.currentNote)) {
      this.setState({
        currentNote: note?.currentNote ? { ...note?.currentNote } : null,
        isStartingTinyMCE: !prevProps?.note?.currentNote
      });
    }
  }

  static propTypes = {
    note: PropTypes.object,
    clearCurrentNote: PropTypes.func,
    saveNote: PropTypes.func
  };

  saveContent = (e) => {
    const { saveNote } = this.props;
    const { currentNote } = this.state;
    e?.preventDefault();
    const content = this.currentEditor?.getContent();
    const saveAt = dayjs().format('DD/MM/YYYY HH:mm:ss');

    saveNote({
      note: {
        ...(currentNote || {}),
        content: content,
        insertedAt: saveAt,
        updatedAt: saveAt
      }
    });
  };

  render() {
    const { clearCurrentNote } = this.props;
    const { currentNote, isStartingTinyMCE } = this.state;

    if (!currentNote)
      return (
        <div className="c-empty-work">
          <GoNote className="c-empty-work__icon" />
        </div>
      );

    return (
      <div>
        <div className="main-tab__title-input">
          <div className="c-title-input">
            <div className="title-text-wrapper">
              <span className="title-text">Title: </span>
            </div>
            <div className="title-input-wrapper">
              <input
                className="real-input-title"
                defaultValue={currentNote?.title}
                value={currentNote?.title || ''}
                autoFocus
                onChange={(e) =>
                  this.setState({ currentNote: { ...currentNote, title: e?.target?.value || '' } })
                }
              />
            </div>
          </div>
        </div>
        {isStartingTinyMCE ? (
          <div className="mce-loading">
            <ReactLoading type="cylon" color="#ccc" />
          </div>
        ) : null}
        <Editor
          apiKey="5qvottucgw0p2qz0k8b0z8b6rp866s1yt3v2k6mjamp86cvv"
          onInit={(evt, editor) => {
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
          value={currentNote?.content}
          onEditorChange={(content) => {
            this.setState({ currentNote: { ...(currentNote || {}), content: content } });
          }}
        />
        <div className="main-tab__footer">
          <div onClick={clearCurrentNote} className="clear-btn-normal-state clear-btn">
            <span className="white-text">Clear</span>
          </div>
          <div className="save-text-normal-state save-btn" onClick={this.saveContent}>
            <span className="white-text">Save</span>
          </div>
        </div>
      </div>
    );
  }
}

const structuredSelector = createStructuredSelector({
  note: (state) => state.note
});

export default connect(structuredSelector, { createTempNote, clearCurrentNote, saveNote })(MainTab);
