import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../components/header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { HeroCarousel } from '../components/Hero'

// const TodoList = () => {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/home/')
//       .then(res => {
//         setTodos(res.data);
//       });
//   }, []);

//   return (
//     <ul>
//       {todos.map(todo => (
//         <li key={todo.id}>
//           {todo.title}
//           {/* Add buttons for edit and delete operations here */}
//         </li>
//       ))}
//     </ul>
//   );
// };

function App() {
  const [url, setData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('spotify/get-auth-url');
      const result = await response.json();
      setData(result.url);
    };

    fetchData();
  }, []);

  const [isAuth, setAuth] = useState('');
  useEffect(() => {
    const fetchAuth = async () => {
      const response = await fetch('spotify/is-authenticated');
      const result = await response.json();
      setAuth(result.status)
    };
    fetchAuth();
  }, []);

  return (
    <div className="App">
      <Header url={url} showConnectButton={!isAuth} />
      <Hero />
      <HeroCarousel />
      <Footer />
    </div>
  )
}

export default App;