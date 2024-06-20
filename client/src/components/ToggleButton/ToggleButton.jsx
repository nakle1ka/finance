import "./ToggleButton.css"

const ToggleButton = ({ onClickFunction, disableFunction, isChecked }) => {

    function handleClick() {
        if (!isChecked) {
            onClickFunction()
        } else {
            disableFunction()
        }
    }

    let currentActiveClass
    if (isChecked) {
        currentActiveClass = "toggleBtn toggleBtn-active"
    } else {
        currentActiveClass = "toggleBtn"
    }

    return (
        <button type="checkbox" className={currentActiveClass} onClick={handleClick}>
            <div className="circle"></div>
        </button>
    );
}

export default ToggleButton;