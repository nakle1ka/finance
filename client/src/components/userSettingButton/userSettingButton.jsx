const userSettingButton = ({ text, icon, fontColor }) => {
    return (
        <button>
            <img src={icon}/>
            <p style={{color: fontColor}}>{text}</p>
        </button>
    );
}

export default userSettingButton;