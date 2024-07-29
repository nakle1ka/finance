import React, { useState } from "react";
import Output from "../../components/Output/Output";
import ProfitLossBtns from "../../components/ProfitLossBtns/ProfitLossBtns";
import Search from "../../components/Search/Search";

import "./Home.css"

//Я пытался использовать useContext, но у меня ничего не получилось((

const Home = ({ cardsSate, isShowSaveBtn }) => {

    const [cards, setCards, newElements, setNewElements] = cardsSate
    const [searchQuery, setSearchQuery] = useState([])

    return (
        <div className="homePage">

            <Search
                cardsState={{
                    cards, setCards
                }}
                searchQueryState={{
                    setSearchQuery
                }}
            />

            <ProfitLossBtns
                cardsState={{
                    cards,
                    setCards,
                    newElements,
                    setNewElements
                }}
                isShowSaveBtn={isShowSaveBtn}
            />

            <Output
                cardsState={{
                    cards, setCards
                }}
                searchQueryState={{
                    searchQuery
                }} />

        </div>
    );
}

export default Home;