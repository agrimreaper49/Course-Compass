//import React from 'react';
//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  
  const [data, setData] = useState("loading...");
  const [myString, setMyString] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
      fetch('https://sis-scraper.onrender.com/getInfo', {
      method: 'get'
     }).then(response => response.json())
     .then(response => setData(response))
     .catch(err => console.log(err));
  });


  return (
    <div className="App">
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
      <h1>WORK WORK WORK</h1>
    </div>
  );
}

export default App;
