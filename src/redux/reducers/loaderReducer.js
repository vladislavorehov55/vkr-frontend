import {SHOW_LOADER} from "../types";

const initialState = {isShowed: false}
export const loaderReducer = (state = initialState, action) => {
    if (action.type === SHOW_LOADER) {
        return {isShowed: true}
    }
    else {
        return {isShowed: false}
    }
}
