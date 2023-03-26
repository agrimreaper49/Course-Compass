//import React from 'react';
//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [myString, setMyString] = useState<string>('');
  useEffect(() => {
    fetch('https://sis-scraper.onrender.com', {
      method: 'post',
      body: "2",
     }).then(response => response.json())
     .then(response => console.log(response))
     .catch(err => console.log(err));
  });


  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          {/*myString*/}
        </p>
      </header>
    </div>
  );
}

export default App;
