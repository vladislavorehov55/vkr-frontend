import {combineReducers} from "redux";
import {alertReducer} from "./alertReducer";
import {appReducer} from "./appReducer";
import {clientReducer} from "./clientReducer";
import {loaderReducer} from "./loaderReducer";
import {logistReducer} from "./logistReducer";
import {adminReducer} from "./adminReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    alert: alertReducer,
    client: clientReducer,
    loader: loaderReducer,
    logist: logistReducer,
    admin: adminReducer
})