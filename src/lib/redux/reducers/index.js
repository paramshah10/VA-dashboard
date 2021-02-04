// import journalReducer from './journal'
import chartsReducer from './charts'
import appReducer from './app'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    app: appReducer,
    // journal: journalReducer,
    charts: chartsReducer
})

export default allReducers;