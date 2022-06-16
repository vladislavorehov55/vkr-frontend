import s from './Alert.module.css';
import {useSelector, useDispatch} from "react-redux";
import {hideAlert} from "../../redux/actions";

const Alert = () => {
    const isShowedAlert = useSelector(state => state.alert.isShowed)
    const type = useSelector(state => state.alert.type);
    const alertText = useSelector(state => state.alert.alertText);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(hideAlert())
    }
    return (
        <div className={`${s.wrap} ${isShowedAlert ? s.animateWrap : ''} ${type === 'success' ? s.green : s.red}`}>
            {alertText}
            <span className={s.btn} onClick={clickHandler}>&times;</span>
        </div>
    )
}
export default Alert