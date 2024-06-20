import "./userSettingButton.css"

const UserSettingButton = ({ text, icon, fontColor, onClick }) => {
    return (
        <button className="user-settings__button" onClick={onClick}>
            <img src={icon}/>
            <p style={{color: fontColor}}>{text}</p>
        </button>
    );
}

export default UserSettingButton;