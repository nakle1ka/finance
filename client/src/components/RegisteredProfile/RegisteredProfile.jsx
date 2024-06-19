import ProfileCard from "../ProfileCard/ProfileCard"
import { useRef } from "react"

import UserSettingButton from "../userSettingButton/userSettingButton"

import getCookieByName from "../../utils/getCookieByName"
import readFileAsBase64 from "../../utils/readFileAsBase64"

import "./RegisteredProfile.css"

import noAvatarImg from "./img/questionmark_83826.svg"
import changeAvatarIcon from "./img/Edit.png"

import lossIcon from "../../imgs/icons/income.png"
import incomeIcon from "../../imgs/icons/loss.png"
import totalIcon from "../../imgs/icons/total.png"
import settingIcon from "./img/Settings.png"
import changePasswordIcon from "./img/Key.png"
import logoutIcon from "./img/Logout.png"
import deleteAccountIcon from "./img/delete.png"

const RegisteredProfile = ({ avatar, username, statData, PORT }) => {

    const inputRef = useRef()

    let currentAvatar
    let currentAvatarClass

    if (avatar) {
        currentAvatar = avatar
        currentAvatarClass = "user__avatar"
    } else {
        currentAvatar = noAvatarImg
        currentAvatarClass = "user__avatar no-avatar"
    }

    const totalIncome =
        Number(statData["main job"]) +
        Number(statData["underwork"]) +
        Number(statData["deposits"]) +
        Number(statData["payments"]) +
        Number(statData["profit other"])
    const totalLoss =
        Number(statData["housing"]) +
        Number(statData["food"]) +
        Number(statData["medicine"]) +
        Number(statData["transport"]) +
        Number(statData["rest"]) +
        Number(statData["education"]) +
        Number(statData["loss other"])

    function handleClickToInput() {
        inputRef.current.click()
    }

    async function hanleChangeAvatar(e) {
        const fileURL = await readFileAsBase64(e)
        const token = getCookieByName("userId")

        fetch(PORT + "/updateUserAvatar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                avatar: fileURL
            }),
            credentials: 'include'
        })
            .then(window.location.reload())
    }

    return (
        <div className="profile-container">

            <div className="profile__user">
                <div className="user__user-container">
                    <div className="user__avatar-container">
                        <img src={currentAvatar} alt="userAvatar" className={currentAvatarClass} />
                        <button className="user__changeAvatar" onClick={handleClickToInput}>
                            <img src={changeAvatarIcon} alt="Edit avatar" />
                        </button>
                        <input type="file" className="user__changeAvatarInput" accept="image/*,.png,.jpg" ref={inputRef} onChange={e => hanleChangeAvatar(e)} />
                    </div>
                    <p className="user__username">{username}</p>
                </div>

                <div className="user__user-settings-container">
                    <button className="user__settings-btn">
                        <img src={settingIcon} alt="" />
                    </button>

                    <div className="user__user-settings">
                        <UserSettingButton
                            text="Change password"
                            icon={changePasswordIcon}
                        />

                        <UserSettingButton
                            text="Logout"
                            icon={logoutIcon}
                            fontColor="red"
                        />

                        <UserSettingButton
                            text="Delete account"
                            icon={deleteAccountIcon}
                            fontColor="red"
                        />
                    </div>
                </div>

            </div>

            <div className="profile__stat-container">

                <div className="stat__graph-container">
                    <div className="graph-side">
                        <div className="graph">
                            <div className="income-graph" style={{ height: ((totalIncome / (totalIncome + totalLoss)) * 100) + "%" }}></div>
                            <div className="loss-graph" style={{ height: ((totalLoss / (totalIncome + totalLoss)) * 100) + "%" }}></div>
                        </div>
                    </div>

                    <div className="stat__info">
                        <p id="income_info">income</p>
                        <p id="loss_info">loss</p>
                    </div>
                </div>

                <ProfileCard icon={incomeIcon} text={"total income"} value={totalIncome} />

                <ProfileCard icon={lossIcon} text={"total loss"} value={totalLoss} />

                <ProfileCard icon={totalIcon} text={"income - loss"} value={totalIncome - totalLoss} />

                <div className="profile__line-graph-container">
                    <div className="l-graph__side">
                        <ul className="l-graph__category-list">
                            <li className="l-graph__category-item" id="l-graph__Main-job">Main job</li>
                            <li className="l-graph__category-item" id="l-graph__Underwork">Underwork</li>
                            <li className="l-graph__category-item" id="l-graph__Deposits">Deposits</li>
                            <li className="l-graph__category-item" id="l-graph__Payments">Payments</li>
                            <li className="l-graph__category-item" id="l-graph__i-Other">Other</li>
                        </ul>

                        <div className="l-graph__graph">
                            <div className="l-graph__category-graph" id="l-graph__Main-job-graph" style={{ width: (Number(statData["main job"]) / totalIncome) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__Underwork-graph" style={{ width: (Number(statData["underwork"]) / totalIncome) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__Deposits-graph" style={{ width: (Number(statData["deposits"]) / totalIncome) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__Payments-graph" style={{ width: (Number(statData["payments"]) / totalIncome) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__i-Other-graph" style={{ width: (Number(statData["profit other"]) / totalIncome) * 100 + "%" }}></div>
                        </div>
                    </div>

                    <div className="l-graph__side">
                        <ul className="l-graph__category-list">
                            <li className="l-graph__category-item" id="l-graph__Housing">Housing</li>
                            <li className="l-graph__category-item" id="l-graph__Food">Food</li>
                            <li className="l-graph__category-item" id="l-graph__Medicine">Medicine</li>
                            <li className="l-graph__category-item" id="l-graph__Transport">Transport</li>
                            <li className="l-graph__category-item" id="l-graph__Rest">Rest</li>
                            <li className="l-graph__category-item" id="l-graph__Education">Education</li>
                            <li className="l-graph__category-item" id="l-graph__l-Other">Other</li>
                        </ul>

                        <div className="l-graph__graph">
                            <div className="l-graph__category-graph" id="l-graph__Housing-graph" style={{ width: (Number(statData["housing"]) / totalLoss) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__Food-graph" style={{ width: (Number(statData["food"]) / totalLoss) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__Medicine-graph" style={{ width: (Number(statData["medicine"]) / totalLoss) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__Transport-graph" style={{ width: (Number(statData["transport"]) / totalLoss) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__Rest-graph" style={{ width: (Number(statData["rest"]) / totalLoss) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__Education-graph" style={{ width: (Number(statData["education"]) / totalLoss) * 100 + "%" }}></div>
                            <div className="l-graph__category-graph" id="l-graph__l-Other-graph" style={{ width: (Number(statData["loss other"]) / totalLoss) * 100 + "%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisteredProfile;