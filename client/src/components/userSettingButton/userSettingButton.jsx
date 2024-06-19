import "./userSettingButton.css"

const UserSettingButton = ({ text, icon, fontColor }) => {
    return (
        <button className="user-settings__button">
            <img src={icon}/>
            <p style={{color: fontColor}}>{text}</p>
        </button>
    );
}

export default UserSettingButton;