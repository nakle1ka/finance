import { useEffect, useState } from "react"

import MyModal from "../MyModal/MyModal"

import "./ProfitLossBtns.css"

import plusIcon from "../../imgs/icons/Plus.png"
import saveIcon from "../../imgs/icons/Done.png"

import getCookieByName from "../../utils/getCookieByName"

const ProfitLossBtns = ({ cardsState, PORT, isShowSaveBtn }) => {

    const [isShowSaveButton, setIsShowSaveButton] = isShowSaveBtn

    const [states, setStates] = useState({
        isShowModal: false,
        selectTypeState: "+",
        selectCategoryState: "main job",
        inputValueState: "",
        inputTitleState: "",
        errorState: ""
    })

    useEffect(() => {
        const type = states.selectTypeState

        if (type === "-") {
            setStates(prev => ({ ...prev, selectCategoryState: "housing" }))
        } else {
            setStates(prev => ({ ...prev, selectCategoryState: "main job" }))
        }

    }, [states.selectTypeState])

    function addCard(e) {
        e.preventDefault()

        if (states.inputValueState !== "" && states.inputTitleState !== "") {
            cardsState.setCards(prev => ([
                {
                    id: Date.now(),
                    title: states.inputTitleState,
                    type: states.selectTypeState,
                    value: states.inputValueState,
                    category: states.selectCategoryState
                },
                ...prev
            ]))

            //for server
            cardsState.setNewElements(prev => ([
                {
                    id: Date.now(),
                    title: states.inputTitleState,
                    type: states.selectTypeState,
                    value: states.inputValueState,
                    category: states.selectCategoryState
                },
                ...prev
            ]))

            setStates({
                isShowModal: false,
                selectTypeState: "+",
                selectCategoryState: "main job",
                inputValueState: "",
                inputTitleState: ""
            })

            setIsShowSaveButton(true)
        } else {
            setStates(prev => ({ ...prev, errorState: "You didn't enter a value!" }))
        }
    }

    function changeValueInputValue(e) {
        let result = e.target.value.substr(0, 6)

        if (result === "" || Number(result < 0)) {
            result = " "
        }

        setStates(prev => ({
            ...prev,
            inputValueState: result
        }))

    }

    function saveElements(e) {
        e.preventDefault()

        try {
            const token = getCookieByName("userId")
            if (!token) throw new Error("unautherizated!")
            fetch(PORT + "/saveElemnts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(cardsState.newElements)
            })
                .then(data => data.text())
                .then(res => {
                    const parseRes = JSON.parse(res)

                    if(parseRes.isSuccessfully) window.location.reload()
                })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section id="main__profit_loss_btns_section">
            <form className="profit_loss_form">
                <button type="submit" className="card_button" onClick={(e) => { e.preventDefault(); setStates((prev) => ({ ...prev, isShowModal: true })) }}>
                    <img src={plusIcon} alt="" />
                    <p>Add</p>
                </button>

                {isShowSaveButton && (
                    <button type="submit" className="card_button" onClick={e => saveElements(e)}>
                        <img src={saveIcon} alt="" />
                        <p>Save</p>
                    </button>
                )}
            </form>

            {states.isShowModal && (<MyModal setStates={[setStates, "isShowModal"]} isClose={true}>
                <form id="addCardForm">

                    <label htmlFor="setTitleInpuit" className="label">Title</label>
                    <input type="text" className="modalFormInput" id="setTitleInpuit" placeholder="Enter a title" value={states.inputTitleState} onChange={e => setStates(prev => ({ ...prev, inputTitleState: e.target.value }))} />

                    <label htmlFor="selectCategory" className="label">Category</label>
                    <select name="selectCategory" className="modalFormInput" id="selectCategory" value={states.selectCategoryState} onChange={e => setStates(prev => ({ ...prev, selectCategoryState: e.target.value }))}>
                        {states.selectTypeState === "+" && (
                            <>
                                <option value="main job">Main job</option>
                                <option value="underwork">Underwork</option>
                                <option value="deposits">Deposits</option>
                                <option value="payments">Payments</option>
                                <option value="profit other">Profit other</option>
                            </>
                        )}
                        {states.selectTypeState === "-" && (
                            <>
                                <option value="housing">Housing</option>
                                <option value="food">Food</option>
                                <option value="medicine">Medicine</option>
                                <option value="transport">Transport</option>
                                <option value="rest">Rest</option>
                                <option value="education">Education</option>
                                <option value="loss other">Loss other</option>
                            </>
                        )}
                    </select>


                    <label htmlFor="selectType" className="label">Type</label>
                    <select name="selectType" className="modalFormInput" id="selectType" value={states.selectTypeState} onChange={(e) => setStates((prev) => ({ ...prev, selectTypeState: e.target.value }))}>
                        <option value="+">plus</option>
                        <option value="-">minus</option>
                    </select>

                    <label htmlFor="inputValue" className="label">Value</label>
                    <input type="number" className="modalFormInput" id="inputValue" min="0" max="999999" placeholder="000000" value={states.inputValueState} onChange={e => changeValueInputValue(e)} />

                    <div className="error">
                        {states.errorState}
                    </div>

                    <button type="submit" id="addCardButton" onClick={(e) => addCard(e)}>Add</button>
                </form>
            </MyModal>)}
        </section>
    );
}

export default ProfitLossBtns;