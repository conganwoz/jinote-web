import "./App.css";
import { SideTab, MainTab } from "./components/Mains";

function App() {
  return (
    <div className="App">
      <header>
        <script
          src="https://cdn.tiny.cloud/1/5qvottucgw0p2qz0k8b0z8b6rp866s1yt3v2k6mjamp86cvv/tinymce/5/tinymce.min.js"
          referrerpolicy="origin"
        ></script>
      </header>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", height: "100vh" }}>
        <div style={{ width: 300, background: "#eee", height: "100vh" }}>
          <SideTab />
        </div>
        <div style={{ flexGrow: 1, height: "100vh" }}>
          <MainTab />
        </div>
      </div>
    </div>
  );
}

export default App;
