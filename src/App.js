import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './App.css';
import { FaSearch } from "react-icons/fa";

function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

  function getMeaning() {
      Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`).then((response) => {
      setData(response.data[0]);
    });
  }

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }
  
  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        <input type="text" placeholder="Search..." onChange={(e) => { setSearchWord(e.target.value) }} />
        <button onClick={() => { getMeaning() }}><FaSearch size="20px"/></button>
      </div>
      {data && <div className="showResults">
        <h3>{data.word}</h3>
        <button onClick={() => {playAudio()}}>Listen</button>
        <p>Parts of speech: {data.meanings[0].partOfSpeech}</p>
        <p>Definition: {data.meanings[0].definitions[0].definition}</p>
        <p>Example: {data.meanings[0].definitions[0].example}</p>
      </div>
      }
    </div>
  );
}

export default App;
