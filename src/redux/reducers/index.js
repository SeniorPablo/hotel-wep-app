import { TOGGLE_LOGIN_USER } from "../types"

export default (state, action) => {
    switch (action.type) {
        case TOGGLE_LOGIN_USER:
            return {
              ...state,
              userLogged: !state.userLogged,
            };
        default:
            return state
    }
}
