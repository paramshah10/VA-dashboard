const initialState = {
    fetchedChartsData: false,
    overalls: {},
}

const chartsReducer = (state = initialState, action) => {
    switch(action.type) {
        case "FETCHED_CHARTS_DATA":
            return Object.assign({}, state, {
                fetchedChartsData: true
            })

        case "ADD_OVERALLS":
            return Object.assign({}, state, {
                overalls: action.overalls
            })
        
        default:
            return state
    }
}

export default chartsReducer