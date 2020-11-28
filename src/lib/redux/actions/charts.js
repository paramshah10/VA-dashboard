export const fetchedChartsData = () => {
    return {
        type: "FETCHED_CHARTS_DATA"
    }
}

export const addOveralls = (data) => {
    return {
        type:  "ADD_OVERALLS",
        overalls: data
    }
}