import {GET_BIDS} from "../types";

const initialState = {bids: []}
export const clientReducer = (state = initialState, action) => {
    if (action.type === GET_BIDS) {
        return {...state, bids: action.payload.bids}
    }
    return state
}