const getCookieByName = (name) => {
    return document.cookie.split(";").filter(cookie => cookie.includes(name)).toString().split("=")[1];
}
 
export default getCookieByName;