import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class MainTab extends React.Component {
  constructor(props) {
    super(props);
    this.currentEditor = null;
  }

  saveContent = (e) => {
    e?.preventDefault();
    console.log('data__', this.currentEditor?.getContent());
  }

  render() {
    return (
      <div>
        <Editor
          apiKey="5qvottucgw0p2qz0k8b0z8b6rp866s1yt3v2k6mjamp86cvv"
          onInit={(evt, editor) => (this.currentEditor = editor)}
          initialValue="<h1><strong>What's next?</strong></h1>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 10 }}>
          <div style={{ padding: 10, background: "#0050b3", marginRight: 10, cursor: "pointer" }} onClick={this.saveContent}>
            <span style={{ color: "#fff" }}>Save</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MainTab;
