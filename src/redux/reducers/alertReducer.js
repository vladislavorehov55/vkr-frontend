import {HIDE_ALERT, SHOW_ALERT} from "../types";

const initialState = {
    isShowed: false,
    alertText: '',
    type: null
};

export const alertReducer = (state = initialState, action) => {
    if (action.type === SHOW_ALERT) {
        const {type, message} = action.payload;
        return {isShowed: true, alertText: message, type}
    }
    else if (action.type === HIDE_ALERT) {
        return {...state, isShowed: false}
    }
    return state
}