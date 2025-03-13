import React, { useState, useEffect } from 'react';
import axios from 'axios';

//from todo tutorial: ignore for now, using as guideline for later
const AddTodoForm = () => {
    const [title, setTitle] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/api/home/', { title })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    );
  };
  
  export default AddTodoForm;