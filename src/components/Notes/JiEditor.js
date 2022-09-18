import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { Editor } from '@tinymce/tinymce-react';

class JiEditor extends React.Component {
  constructor(props) {
    super(props);
    this.currentEditor = null;
  }

  static propTypes = {
    onChange: PropTypes.func,
    isBootingUp: PropTypes.bool,
    onBootingFinished: PropTypes.func,
    value: PropTypes.string
  };

  render() {
    const { isBootingUp, onBootingFinished, onChange, value } = this.props;
    return (
      <>
        {isBootingUp ? (
          <div className="mce-loading">
            <ReactLoading type="cylon" color="#ccc" />
          </div>
        ) : null}
        <Editor
          apiKey="5qvottucgw0p2qz0k8b0z8b6rp866s1yt3v2k6mjamp86cvv"
          onInit={(evt, editor) => {
            this.currentEditor = editor;
            onBootingFinished();
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
          value={value}
          onEditorChange={onChange}
        />
      </>
    );
  }
}
export default JiEditor;
