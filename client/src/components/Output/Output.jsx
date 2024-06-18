import { useMemo } from "react";
import { nanoid } from "nanoid";

import Card from "../Card/CArd";

import "./Output.css"

const Output = ({ cardsState, searchQueryState }) => {

    const { cards, setCards } = cardsState
    const { searchQuery } = searchQueryState

    const sortedByDateCards = useMemo(() => {
        let currentCards

        if(searchQuery.length) {
            currentCards = searchQuery
        } else {
            currentCards = cards
        }

        const sortedCards = currentCards.sort((a, b) => parseInt(a.id) - parseInt(b.id))

        if (sortedCards.length > 0) {
            return sortedCards.reduce((acc, item) => {
                const dateId = new Date(parseInt(item.id)).toLocaleDateString()

                if (!acc[dateId]) {
                    acc[dateId] = []
                }

                acc[dateId].push(item)

                return acc
            }, {})
        } else {
            return {}
        }
    }, [cards, searchQuery])

    //card value change

    const handleChangeInputValue = (newValue, cardIt) => {
        setCards(prev => prev.map(el => el.id === cardIt ? { ...el, value: newValue } : el))
    }

    return (
        <section id="main__output_section">
            {Object.entries(sortedByDateCards).reverse().map(([date, cards]) => (
                <div className="date" key={nanoid()}>
                    <p>{date}</p>
                    <div className="elements">
                        {cards.reverse().map(el => <Card cardData={el} key={el.id} cardsState={cardsState} onChangeValue={handleChangeInputValue} />)}
                    </div>
                </div>
            ))}

            {cards.length === 0 && (
                <div className="noElements">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <path d="M25,2C12.317,2,2,12.318,2,25s10.317,23,23,23s23-10.318,23-23S37.683,2,25,2z M7,25c0-4.062,1.371-7.8,3.65-10.815 L35.815,39.35C32.8,41.629,29.062,43,25,43C15.075,43,7,34.925,7,25z M39.35,35.815L14.185,10.65C17.2,8.371,20.938,7,25,7 c9.925,0,18,8.075,18,18C43,29.062,41.629,32.8,39.35,35.815z"></path>
                    </svg>
                    <p>You don't have any cards yet</p>
                </div>
            )}
        </section>
    );
}

export default Output;