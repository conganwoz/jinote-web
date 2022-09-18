import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEqual } from 'lodash';
import dayjs from 'dayjs';
import { GoNote } from 'react-icons/go';

import { createTempNote, clearCurrentNote, saveNote } from '../../actions/note';
import { JiEditor, JiTitle, MainTabFooter } from '../Notes';

class MainTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: null,
      isStartingTinyMCE: false
    };
  }

  static propTypes = {
    note: PropTypes.object,
    clearCurrentNote: PropTypes.func,
    saveNote: PropTypes.func
  };

  componentDidUpdate(prevProps) {
    const { note } = this.props;

    if (!isEqual(note?.currentNote, prevProps?.note?.currentNote))
      this.setState({
        currentNote: note?.currentNote ? { ...note?.currentNote } : null,
        isStartingTinyMCE: !prevProps?.note?.currentNote
      });
  }

  saveContent = (e) => {
    const { saveNote } = this.props;
    const { currentNote } = this.state;
    e?.preventDefault();
    const saveAt = dayjs().format('DD/MM/YYYY HH:mm:ss');

    saveNote({
      note: {
        ...(currentNote || {}),
        insertedAt: saveAt,
        updatedAt: saveAt
      }
    });
  };

  onChangeTitle = (e) => {
    const { currentNote } = this.state;
    this.setState({ currentNote: { ...currentNote, title: e?.target?.value || '' } });
  };

  onChangeContent = (content) => {
    const { currentNote } = this.state;
    this.setState({ currentNote: { ...(currentNote || {}), content: content } });
  };

  onStartingMCEFinished = () => this.setState({ isStartingTinyMCE: false });

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
        <JiTitle value={currentNote?.title} onChange={this.onChangeTitle} />

        <JiEditor
          onChange={this.onChangeContent}
          value={currentNote?.content || ''}
          onBootingFinished={this.onStartingMCEFinished}
          isBootingUp={isStartingTinyMCE}
        />

        <MainTabFooter clearCurrentNote={clearCurrentNote} onSave={this.saveContent} />
      </div>
    );
  }
}

const structuredSelector = createStructuredSelector({
  note: (state) => state.note
});

export default connect(structuredSelector, { createTempNote, clearCurrentNote, saveNote })(MainTab);
