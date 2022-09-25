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
            width: '100%',
            // menubar: false,
            // plugins: [
            //   "advlist autolink lists link image charmap print preview anchor",
            //   "searchreplace visualblocks code fullscreen",
            //   "insertdatetime media table paste code help wordcount",
            // ],
            // toolbar:
            //   "undo redo | formatselect | " +
            //   "bold italic backcolor | alignleft aligncenter " +
            //   "alignright alignjustify | bullist numlist outdent indent | " +
            //   "removeformat | help",
            // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            selector: 'textarea#open-source-plugins',
            plugins:
              'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
            automatic_uploads: true,
            imagetools_cors_hosts: ['picsum.photos'],
            menubar: 'file edit view insert format tools table help',
            toolbar:
              'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
            toolbar_sticky: true,
            autosave_ask_before_unload: true,
            autosave_interval: '30s',
            autosave_prefix: '{path}{query}-{id}-',
            autosave_restore_when_empty: false,
            autosave_retention: '2m',
            image_advtab: true,
            paste_data_images: true,
            link_list: [
              { title: 'My page 1', value: 'https://www.tiny.cloud' },
              { title: 'My page 2', value: 'http://www.moxiecode.com' }
            ],
            image_list: [
              { title: 'My page 1', value: 'https://www.tiny.cloud' },
              { title: 'My page 2', value: 'http://www.moxiecode.com' }
            ],
            image_class_list: [
              { title: 'None', value: '' },
              { title: 'Some class', value: 'class-name' }
            ],
            importcss_append: true,
            file_picker_callback: function (callback, value, meta) {
              /* Provide file and text for the link dialog */
              if (meta.filetype === 'file') {
                callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
              }

              /* Provide image and alt text for the image dialog */
              if (meta.filetype === 'image') {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');

                /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

                input.onchange = function () {
                  var file = input.files[0];
                  var reader = new FileReader();
                  reader.onload = function (e) {
                    callback(e.target.result, {
                      alt: file.name
                    });
                  };
                  reader.readAsDataURL(file);
                };

                input.click();
              }

              /* Provide alternative source and posted for the media dialog */
              if (meta.filetype === 'media') {
                callback('movie.mp4', {
                  source2: 'alt.ogg',
                  poster: 'https://www.google.com/logos/google.jpg'
                });
              }
            },
            templates: [
              {
                title: 'New Table',
                description: 'creates a new table',
                content:
                  '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
              },
              {
                title: 'Starting my story',
                description: 'A cure for writers block',
                content: 'Once upon a time...'
              },
              {
                title: 'New list with dates',
                description: 'New List with dates',
                content:
                  '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
              }
            ],
            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
            image_caption: true,
            quickbars_selection_toolbar:
              'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_noneditable_class: 'mceNonEditable',
            toolbar_mode: 'sliding',
            contextmenu: 'link image imagetools table',
            skin: 'oxide',
            content_css: 'default',
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
