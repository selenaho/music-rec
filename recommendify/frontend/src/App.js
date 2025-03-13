import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/header';
import Hero from './components/Hero';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/home/')
      .then(res => {
        setTodos(res.data);
      });
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.title}
          {/* Add buttons for edit and delete operations here */}
        </li>
      ))}
    </ul>
  );
};

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
    </div>
  )
}

export default TodoList;