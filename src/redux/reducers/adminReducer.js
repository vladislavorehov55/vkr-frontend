import {DELETE_CAR, DELETE_USER, SET_CARS, SET_USERS} from "../types";

const initialState = {users: [], cars: []}
export const adminReducer = (state = initialState, action) => {
    if (action.type === SET_USERS) {
        return {...state, users: action.payload}
    }
    else if (action.type === DELETE_USER) {
        return {...state, users: action.payload}
    }
    else if (action.type === SET_CARS) {
        return {...state, cars: action.payload}
    }
    else if (action.type === DELETE_CAR) {
        return {...state, cars: action.payload}
    }
    return state
}