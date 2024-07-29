import { useState } from "react";
import "./NoRegProfile.css"

import { PORT } from "../../constants/constants";

const NoRegProfile = () => {

    const [isShowRegister, setIsShowRegister] = useState(true)

    const [inputStates, setInputStates] = useState({
        regUsername: "",
        regPassword: "",
        regSecPassword: "",
        logUsername: "",
        logPassword: ""
    })

    const [errors, setErrors] = useState({
        registerError: "",
        loginError: ""
    })

    function handleRegisterClick(e) {
        e.preventDefault()

        const { regUsername, regPassword, regSecPassword } = inputStates

        if (regUsername.length > 10 ||
            regUsername.length < 2 ||
            regPassword.length < 6
        ) {
            setErrors(prev => ({ ...prev, registerError: "Invalid username or password" }))
        } else if (regPassword !== regSecPassword) {
            setErrors(prev => ({ ...prev, registerError: "Passwords don't match!" }))
        } else {
            fetch(PORT + "/registerNewUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: regUsername,
                    password: regPassword
                })
            })
                .then(res => res.text())
                .then(res => {
                    const parseRes = JSON.parse(res)

                    if (parseRes.isSuccessfully) {
                        document.cookie = `userId=${parseRes.userId}`
                        window.location.reload()
                    } else {
                        setErrors(prev => ({ ...prev, registerError: parseRes.response }))
                    }
                })
        }
    }

    function handleLoginClick(e) {
        e.preventDefault()

        const { logUsername, logPassword } = inputStates

        if (logUsername.length > 10 || logUsername.length < 2 || logPassword.length < 6) {
            setErrors(prev => ({ ...prev, loginError: "Invalid username or password" }))
        } else {
            fetch(PORT + "/loginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: logUsername,
                    password: logPassword
                })
            })
                .then(data => data.text())
                .then(res => {
                    const parseRes = JSON.parse(res)

                    if (parseRes.isSuccessfully) {
                        document.cookie = `userId=${parseRes.userId}`
                        window.location.reload()
                    } else {
                        setErrors(prev => ({ ...prev, loginError: parseRes.response }))
                    }
                })
        }
    }

    return (
        <div className="no-reg-container">
            <div className="form-container">
                {isShowRegister && (
                    <form className="profile-form">
                        <p className="profile-form__text">Register</p>

                        <div className="profile-form__inputs">
                            <input
                                type="text"
                                placeholder="Username"
                                className="profile-form__username"
                                value={inputStates.regUsername}
                                onChange={(e) => setInputStates(prev => ({ ...prev, regUsername: e.target.value }))}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="profile-form__password"
                                value={inputStates.regPassword}
                                onChange={(e) => setInputStates(prev => ({ ...prev, regPassword: e.target.value }))}
                                autoComplete="on"
                            />
                            <input
                                type="password"
                                placeholder="Repeat the password"
                                className="profile-form__second-password"
                                value={inputStates.regSecPassword}
                                onChange={(e) => setInputStates(prev => ({ ...prev, regSecPassword: e.target.value }))}
                                autoComplete="on"
                            />
                        </div>

                        <span className="profile-form__error">{errors.registerError}</span>

                        <div className="profile-form__buttons">
                            <button type="submit" className="profile-form__btn" onClick={(e) => handleRegisterClick(e)}>register</button>
                            <button className="profile-form__toggle" onClick={() => setIsShowRegister(prev => !prev)}>Already have an account?</button>
                        </div>
                    </form>
                )}

                {!isShowRegister && (
                    <form className="profile-form">
                        <p className="profile-form__text">Login</p>

                        <div className="profile-form__inputs">
                            <input
                                type="text"
                                placeholder="Username"
                                className="profile-form__username"
                                value={inputStates.logUsername}
                                onChange={(e) => setInputStates(prev => ({ ...prev, logUsername: e.target.value }))}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="profile-form__password"
                                value={inputStates.logPassword}
                                onChange={(e) => setInputStates(prev => ({ ...prev, logPassword: e.target.value }))}
                                autoComplete="on"
                            />
                        </div>

                        <span className="profile-form__error">{errors.loginError}</span>

                        <div className="profile-form__buttons">
                            <button type="submit" className="profile-form__btn" onClick={(e) => handleLoginClick(e)}>login</button>
                            <button className="profile-form__toggle" onClick={() => setIsShowRegister(prev => !prev)}>Don't have an account yet?</button>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
}

export default NoRegProfile;