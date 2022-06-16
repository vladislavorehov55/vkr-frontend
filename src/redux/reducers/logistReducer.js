import {SET_LOGIST_DATA} from "../types";

const initialState = {data: []}
export const logistReducer = (state = initialState, action) => {
    if (action.type === SET_LOGIST_DATA) {
        return {...state, data: action.payload}
    }
    return state
}