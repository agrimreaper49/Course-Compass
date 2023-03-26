//import React from 'react';
import logo from './saber.png';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [myString, setMyString] = useState<string>('');
  useEffect(() => {
    fetch("http://127.0.0.1:5000/string")
      .then((res) => res.json())
      .then((res) => {
        setMyString(res.string);
        console.log(myString )
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {myString}
        </p>
      </header>
    </div>
  );
}

export default App;
