import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

class SideTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", padding: 10 }}>
        <div style={{}}>
          <span style={{ fontSize: 30, fontWeight: 540, float: "left" }}>My Notes</span>
        </div>

        <div style={{ marginTop: 50, width: '100%', }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: 10,
              background: "rgba(204,204,204,0.3)",
              
              cursor: 'pointer'
            }}
          >
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

export default SideTab;

// chrome://flags/#enable-force-dark
