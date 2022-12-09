import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"

import reducer from "./reducers"

const initialState = {
    userLogged: false
}

export const store = createStore(
    reducer,
    initialState,
    applyMiddleware(reduxThunk)
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
