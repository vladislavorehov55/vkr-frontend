import {useState} from "react";
import {useDispatch} from "react-redux";
import {registerClient, showAlert} from "../../../redux/actions";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import s from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [form, setForm] = useState({login: '', password: '', repeatedPassword: '', FIO: ''});
  const dispatch = useDispatch();
  const {request} = useHTTPRequest()
  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (form.password !== form.repeatedPassword) {
      dispatch(showAlert('warning', 'Пароли не совпадают'));
      return
    }
    dispatch(registerClient({login: form.login, password: form.password, FIO: form.FIO}, request));
  }
  return (
    <div className={s.wrap}>
      <form className={s.form} onSubmit={submitHandler}>
        <div className={s.inputGroup}>
          <span className={s.label}>Введите ФИО</span>
          <input className={s.input} placeholder='Введите ФИО'
                 name='FIO'
                 value={form.FIO}
                 onChange={changeHandler}/>
        </div>
        <div className={s.inputGroup}>
          <span className={s.label}>Введите логин</span>
          <input className={s.input} placeholder='Введите логин'
                 name='login'
                 value={form.login}
                 onChange={changeHandler}/>
        </div>
        <div className={s.inputGroup}>
          <span className={s.label}>Введите пароль</span>
          <input className={s.input} type="password" placeholder='Введите пароль'
                 name='password'
                 value={form.password}
                 onChange={changeHandler}/>
        </div>
        <div className={s.inputGroup}>
          <span className={s.label}>Повторите пароль</span>
          <input className={s.input} type="password" placeholder='Введите пароль еще раз'
                 name='repeatedPassword'
                 value={form.repeatedPassword}
                 onChange={changeHandler}/>
        </div>
        <div className={s.btnWrap}>
          <button className={s.btn}>Зарегистрироваться</button>
        </div>
      </form>
    </div>

  )
}
export default RegistrationForm