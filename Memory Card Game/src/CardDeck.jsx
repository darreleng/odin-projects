import Card from "./Card";
import './CardDeck.css';
import { useState, useEffect, useMemo } from "react";

function getIds(numberOfCards) {
    const uniqueSet = new Set();
    const cardPairs = numberOfCards / 2
    while (uniqueSet.size < cardPairs) {
        const randomId = Math.floor(Math.random() * 151) + 1;
        uniqueSet.add(randomId);
    }
    return Array.from(uniqueSet);
}

function shuffleDeck(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function fetchSprites(ids) {
    const settledResults = await Promise.allSettled(ids.map(async(id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) return {id: 0, spriteUrl: './assets/ditto_shiny.png'};

        const data = await response.json();

        return { id: id, spriteUrl: data.sprites.front_default };
                            
    }))
   return settledResults.map(result => result.value);
}

export default function CardDeck({ numberOfCards, gameboardClass, handleTurn, checkGameComplete }) {
    const [cardDeck, setCardDeck] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    
    const ids = useMemo(() => {
        return getIds(numberOfCards);
    }, [numberOfCards]);

    useEffect(() => {
        async function loadDeck() {
            const sprites = await fetchSprites(ids)
            setCardDeck(shuffleDeck(sprites.flatMap(sprite => [
                {...sprite, matched: false},
                {...sprite, matched: false}
            ])));
        }
        loadDeck();
    }, [ids]);

    function handleChoice(card) {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            handleTurn();

            if (choiceOne.id === choiceTwo.id) setCardDeck(prevCards => {
                const newDeck = prevCards.map(card => card.id === choiceOne.id ? {...card, matched: true} : card);

                if (newDeck.every(card => card.matched)) checkGameComplete();

                return newDeck;
            }
            )
            
            setTimeout(() => {
                resetChoices();
                setDisabled(false);
            }, 500);
        }
    }, [choiceTwo]);

    function resetChoices() {
        setChoiceOne(null);
        setChoiceTwo(null);
    }


    return (
        <div className={gameboardClass}>
            {cardDeck.map((card, index) =>
                <Card key={index} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
            )}
        </div>
    )
}

