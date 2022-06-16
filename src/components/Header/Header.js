import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import s from './Header.module.css'
import {signOut} from "../../redux/actions";
import SvgGenerator from "../SvgGenerator/SvgGenerator";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  const isAuth = useSelector(state => state.app.isAuth);
  const username = useSelector(state => state.app.username);
  const role = useSelector(state => state.app.role);

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  }
  const getHeaderClasses = useMemo(() => {
    if (role === 'logist' || role === 'driver') {
      return `${s.header} ${s.headerEnd}`
    }
    return `${s.header}`
  }, [role])


  if (!isAuth) return '';
  return (
    <header className={getHeaderClasses}>
      <Navbar role={role}/>
      <div className={s.signoutWrap}>
        <span>{username}</span>
        <SvgGenerator type='arrow-down'/>
        <div className={s.signout} onClick={signOutHandler}>Выйти</div>
      </div>
    </header>
  )
}
export default Header