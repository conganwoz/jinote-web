import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { SideTab, MainTab } from './components/Mains';
import { store } from './store';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <script
            src="https://cdn.tiny.cloud/1/5qvottucgw0p2qz0k8b0z8b6rp866s1yt3v2k6mjamp86cvv/tinymce/5/tinymce.min.js"
            referrerPolicy="origin"></script>
        </header>
        <Provider store={store}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '100vh'
            }}>
            <div
              style={{
                width: 300,
                background: '#eee',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
              <SideTab />
            </div>
            <div style={{ flexGrow: 1, height: '100vh' }}>
              <MainTab />
            </div>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
