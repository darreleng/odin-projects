import './DeckSizeSelector.css';

export default function DeckSizeSelector({ onClick }) {
    const deckSizes = [{gameboardClass: 'gameboard-twelve', btnClass: 'btn-twelve', cards: 12}, {gameboardClass: 'gameboard-sixteen', btnClass: 'btn-sixteen', cards: 16}, {gameboardClass: 'gameboard-twentyfour', btnClass: 'btn-twentyfour', cards: 24}];

    return (
        <div className="deck-size-selector-wrapper">
            {deckSizes.map(deck => 
                <button className={deck.btnClass} key={deck.cards} onClick={() => onClick(deck.cards, deck.gameboardClass)}>{deck.cards}</button>
            )}
        </div>
    )
    
}