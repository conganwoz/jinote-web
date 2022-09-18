import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { store } from './store';
import { TINY_CLOUD_URL } from './constants';
import { SideTab, MainTab } from './components/Mains';

function App() {
  return (
    <div className="App">
      <header>
        <script src={TINY_CLOUD_URL} referrerPolicy="origin" />
      </header>
      <Provider store={store}>
        <div className="main-container">
          <div className="side-tab-container">
            <SideTab />
          </div>
          <div className="main-tab-container">
            <MainTab />
          </div>
        </div>
      </Provider>
    </div>
  );
}

export default App;
