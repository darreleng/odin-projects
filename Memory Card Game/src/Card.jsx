import { useEffect, useState } from 'react';
import "./Card.css";

export default function Card({ card, handleChoice, flipped, disabled }) {
    const [isSelected, setSelected] = useState(false);

    function handleClick() {
        if (!disabled) handleChoice(card);
    }

    return (
        <div className={flipped ? "card flipped" : "card"}>
            <button className="card-back" onClick={handleClick}></button>
            <img src={card.spriteUrl} alt="" className='card-front' />
        </div>
    )
}