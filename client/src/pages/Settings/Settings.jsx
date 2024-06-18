import SettingCard from "../../components/SettingCard/SettingCard";

import "./Settings.css"

const Settings = ({ someState, onClickState, disableState }) => {
    const [state, setState] = someState

    return (
        <div className="settingsPage">
            <ul>
                <li><SettingCard
                    title="Light mode"
                    buttonType="checkbox"
                    onClickFunction={() => { setState(prev => ({...prev, [onClickState[0]]: onClickState[1]}))}}
                    disableFunction={() => { setState(prev => ({...prev, [disableState[0]]: disableState[1]}))}}
                    isChecked={state}
                /></li>
            </ul>
        </div>
    );
}

export default Settings;