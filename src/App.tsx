import React from 'react';

import './App.css';
import {Routes, Route} from "react-router-dom";
import {Layout} from "./components/layouts/layout";

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}/>
    </Routes>
  );
}

export default App;
