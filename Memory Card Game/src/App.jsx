import './App.css'
import { useState } from 'react';
import Card from './Card.jsx';
import CardDeck from './CardDeck.jsx';
import DeckSizeSelector from './DeckSizeSelector.jsx';

function App() {
  const [deckSize, setDeckSize] = useState(16);
  const [gameboardClass, setGameboardClass] = useState('gameboard-sixteen');
  const [turns, setTurns] = useState(0);

  function handleSizeSelect(size, gameboardClass) {
    setDeckSize(size);
    setGameboardClass(gameboardClass);
  }

  function handleTurn() {
    setTurns(prevTurns => prevTurns + 1);
  }

  return (
    <div className="app-wrapper">
      <h1>Memory Card Game</h1>
      <DeckSizeSelector onClick={handleSizeSelect}/>
      <button className='new-game'>New Game</button>
      <p>Turns: {turns} </p>
      <CardDeck numberOfCards={deckSize} gameboardClass={gameboardClass} handleTurn={handleTurn}/>
    </div>
  );
}

export default App;


/* 

Start button
Timer component
Score component
Card component

12 16 24

An array of cards
-image api
-id
-selected
-guessed


*/