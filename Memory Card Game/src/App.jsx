import './App.css'
import { useEffect, useState } from 'react';
import CardDeck from './CardDeck.jsx';
import DeckSizeSelector from './DeckSizeSelector.jsx';

function App() {
  const [deckSize, setDeckSize] = useState(16);
  const [gameboardClass, setGameboardClass] = useState('gameboard-sixteen');
  const [turns, setTurns] = useState(0);
  const [highScoreTwelve, setHighScoreTwelve] = useState(null);
  const [highScoreSixteen, setHighScoreSixteen] = useState(null);
  const [highScoreTwentyfour, setHighScoreTwentyfour] = useState(null);
  const [isGameComplete, setGameComplete] = useState(false);
  const [key, setKey] = useState(0);

  function handleSizeSelect(size, gameboardClass) {
    setDeckSize(size);
    setGameboardClass(gameboardClass);
    setTurns(0);
    setGameComplete(false);
    setKey(prevKey => prevKey + 1);
  }

  function handleTurn() {
    setTurns(prevTurns => prevTurns + 1);
  }

  function checkGameComplete() {
    setGameComplete(true);
  }

  useEffect(() => {
    function handleHighScore() {
      if (isGameComplete) {
        if (gameboardClass === 'gameboard-twelve') {
          if (highScoreTwelve === null || highScoreTwelve > turns) setHighScoreTwelve(turns);
        }
        else if (gameboardClass === 'gameboard-sixteen') {
          if (highScoreSixteen === null || highScoreSixteen > turns) setHighScoreSixteen(turns);
        }
        else if (gameboardClass === 'gameboard-twentyfour') {
          if (highScoreTwentyfour === null || highScoreTwentyfour > turns) setHighScoreTwentyfour(turns);
        }
      }
    }
    handleHighScore();
  }, [isGameComplete, turns]);

  return (
    <div className="app-wrapper">
      <h1>Memory Card Game</h1>
      <DeckSizeSelector onClick={handleSizeSelect}/>
      <button className='new-game' onClick={() => setKey(prevKey => prevKey + 1)}>New Game</button>
      <div className="score-wrapper">
        <p className='current-score'><b>Turns:</b> {turns} </p>
        <p className='high-score'><b>High Score:</b> {gameboardClass === 'gameboard-twelve' ? highScoreTwelve : gameboardClass === 'gameboard-sixteen' ? highScoreSixteen : highScoreTwentyfour} </p>
      </div>
      <CardDeck numberOfCards={deckSize} gameboardClass={gameboardClass} handleTurn={handleTurn} turns={turns} checkGameComplete={checkGameComplete} key={key} />
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