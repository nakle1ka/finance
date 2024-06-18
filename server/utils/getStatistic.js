const getStatistic = (elements) => {
    const resultObject = {}

    elements.forEach(el => {
        if (!resultObject["statistic." + el.category]) {
            resultObject["statistic." + el.category] = 0;
        }
        resultObject["statistic." + el.category] += Number(el.value)
    })

    return resultObject
}

module.exports = { getStatistic }