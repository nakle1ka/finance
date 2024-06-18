import { useState } from "react";

import "./Search.css"

import search_svg from "./svg/Vector.svg"

const Search = ({ cardsState, searchQueryState }) => {
    const { cards } = cardsState
    const { setSearchQuery } = searchQueryState

    const [searchValue, setSearchValue] = useState("")

    function searchBtnOnClick(e) {
        e.preventDefault()

        const filteredCards = cards.filter(el => el.title.toLowerCase() == searchValue.toLowerCase() || el.value.toLowerCase() == searchValue.toLowerCase() || el.category.toLowerCase() == searchValue.toLowerCase())

        setSearchQuery(filteredCards)
    }

    return (
        <section id="main__search_section">
            <form className="search">
                <input
                    type="text"
                    placeholder="Enter something..."
                    className="search__input"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                <button
                    type="submit"
                    className="search__button"
                    onClick={(e) => searchBtnOnClick(e)}
                >
                    <img src={search_svg} alt=""  className="search__img"/>
                </button>
            </form>
        </section>
    );
}



export default Search;