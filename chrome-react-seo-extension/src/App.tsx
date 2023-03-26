//import React from 'react';
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [myString, setMyString] = useState<string>('');
  // useEffect(() => {
  //   console.log("Hello")
  //   axios.get('http://127.0.0.1:5000/string')
  //     .then((response: { data: { string: string } }) => {
  //       setMyString(response.data.string);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //     console.log(myString)
  // }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/string")
      .then((res) => res.json())
      .then((res) => {
        setMyString(res.string);
        console.log("!!!!", myString )
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {myString}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );


}


export default App;
