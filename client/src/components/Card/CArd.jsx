import "./Card.css"

//profit icons
import mainJobIcon from "./img/main_job.png"
import underworkIcon from "./img/underwork.png"
import profitDepositsIcon from "./img/profit_doposits.png"
import paymentsIcon from "./img/payments.png"

//loss icons
import housingIcon from "./img/housing.png"
import foodIcon from "./img/food.png"
import medicineIcon from "./img/medicine.png"
import transportIcon from "./img/transport.png"
import restIcon from "./img/rest.png"
import educationIcon from "./img/education.png"

import OtherIcon from "./img/other.png"


const Card = ({ cardData }) => {

    let icons = {
        //profit
        "main job": mainJobIcon,
        "underwork": underworkIcon,
        "deposits": profitDepositsIcon,
        "payments": paymentsIcon,
        "profit other": OtherIcon,
        //loss
        "housing": housingIcon,
        "food": foodIcon,
        "medicine": medicineIcon,
        "transport": transportIcon,
        "rest": restIcon,
        "education": educationIcon,
        "loss other": OtherIcon
    }

    return (
        <>
            <div className="card" id={"id" + cardData.id}>
                <div className="card__left_side">

                    <div className="card__img">
                        <img src={icons[cardData.category]} alt="" />
                    </div>

                    <div className="card__name_category">

                        <p type="text" className="card__title">{cardData.title}</p>

                        <p className="card__category">{cardData.category}</p>

                    </div>

                </div>

                <p className="card__value_container">
                    <span className="card__type">{cardData.type}</span>
                    <span type="number" className="card__value">{cardData.value}</span>
                </p>
            </div>
        </>
    );
}

export default Card;