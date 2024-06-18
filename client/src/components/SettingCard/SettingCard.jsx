import ToggleButton from "../ToggleButton/ToggleButton";

import "./SettingCard.css"

const SettingCard = ({ title, buttonType, onClickFunction, disableFunction, isChecked }) => {

    return (
        <div className="settingCard">
            <p className="title">{title}</p>

            {buttonType === "checkbox" && <ToggleButton onClickFunction={onClickFunction} disableFunction={disableFunction} isChecked={isChecked}/>}
        </div>
    );
}

export default SettingCard;