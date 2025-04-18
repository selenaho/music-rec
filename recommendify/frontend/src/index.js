import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './pages/App';
import Data from './pages/Data';
import Similar from './pages/Similar';
import 'bootstrap/dist/css/bootstrap.css';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/spotify-data" element={<Data />}/>
        <Route path='/similar-artists' element={<Similar />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
