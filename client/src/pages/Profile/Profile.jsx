import NoRegProfile from "../../components/NoRegProfile/NoRegProfile";
import RegisteredProfile from "../../components/RegisteredProfile/RegisteredProfile";

import getCookieByName from '../../utils/getCookieByName'

const Profile = ({ avatar, username, statData }) => {

    let isShowProfile = false

    const userIdCookie = getCookieByName("userId")
    if(userIdCookie) isShowProfile = true 

    return (
        <>
            {isShowProfile && <RegisteredProfile avatar={avatar} username={username} statData={statData}/>}
            {!isShowProfile && <NoRegProfile/>}
        </>
    );
}

export default Profile;