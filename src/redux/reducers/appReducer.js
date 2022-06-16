import {SIGN_IN, SIGN_OUT} from "../types";

const initialState = {isAuth: false, username: '', role: '', userID: null}

export const appReducer = (state = initialState, action) => {
    if (action.type === SIGN_IN) {
        return {isAuth: true, ...action.payload}
    }
    else if (action.type === SIGN_OUT) {
        return {...initialState}
    }
    return state
}