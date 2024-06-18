import "./ProfileCard.css"

const ProfileCard = ({ icon, text, value }) => {
    return (
        <div className="profile-card-container">
            <div className="p-card__upper-side">
                <img src={icon} className="p-card__icon" />
                <p className="p-card__text">{text}</p>
            </div>

            <p className="p-card__value">{value.toString()}</p> {/*так как сначала value = NaN */}
        </div>
    );
}

export default ProfileCard;