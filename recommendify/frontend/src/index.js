import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './pages/App';
import 'bootstrap/dist/css/bootstrap.css';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />}>
//           <Route index element={<AddTodoForm />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
