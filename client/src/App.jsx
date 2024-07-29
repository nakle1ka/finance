import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home"
import Settings from "./pages/Settings/Settings";
import MyModal from "./components/MyModal/MyModal";

import getCookieByName from "./utils/getCookieByName";

import { PORT } from "./constants/constants";

import "./styles/restart.css"
import "./styles/style.css"

function App() {
	const [user, setUser] = useState({
		username: "",
		avatar: "",
		statData: {}
	})

	const [cards, setCards] = useState([])
	const [newElements, setNewElements] = useState([]) //for server
	const [isShowSaveButton, setIsShowSaveButton] = useState(false)
	const [settingsStates, setSettingsStates] = useState({
		isLoading: false,
		lightMode: false
	})

	let currentTheme
	if (settingsStates.lightMode) {
		currentTheme = "app lightMode"
	} else {
		currentTheme = "app"
	}

	useEffect(() => {
		const fetchData = async () => {
			setSettingsStates(prev => ({ ...prev, isLoading: true }));

			try {
				const token = getCookieByName("userId")

				if (!token) {
					throw new Error("unautherizated")
				}

				const response = await fetch(PORT + "/getUserStat", {
					credentials: 'include',
					headers: {
						Authorization: "Bearer " + token
					}
				});
				const res = await response.text();

				if (res === "User not found!") {
					console.error("User not found!"); // Обработка ошибки
				} else {
					const userDB = JSON.parse(res);
					const username = userDB.username;
					const avatar = userDB.avatar
					const output = userDB.output
					setUser(prev => (
						{
							...prev,
							username,
							avatar,
							statData: userDB.statistic
						}
					));
					setCards(output)
				}
			} catch (error) {
				console.error("fetching user data", error); // Обработка ошибок
			}
			finally {
				setSettingsStates(prev => ({ ...prev, isLoading: false }));
			}
		};

		fetchData();
	}, [])

	return (
		<div className={currentTheme}>
			<Router>
				<Navbar />

				<main>
					<Routes>
						<Route path="/profile" element={<Profile
							avatar={user.avatar}
							username={user.username}
							statData={user.statData}
						/>} />
						<Route path="/home" element={
							<Home
								cardsSate={[cards, setCards, newElements, setNewElements]}
								isShowSaveBtn={[isShowSaveButton, setIsShowSaveButton]}
							/>}
						/>
						<Route path="/settings" element={
							<Settings
								someState={[settingsStates.lightMode, setSettingsStates]}
								onClickState={["lightMode", true]}
								disableState={["lightMode", false]}
							/>
						} />
					</Routes>
				</main>
			</Router>

			{settingsStates.isLoading &&
				<MyModal isShow={settingsStates.isLoading} isClose={false}>
					<div className="app-loading">
						<div className="loader"></div>
						<p>loading...</p>
					</div>
				</MyModal>
			}
		</div>
	);
}

export default App;
