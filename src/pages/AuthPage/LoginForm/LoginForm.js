import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {signIn} from "../../../redux/actions";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import s from './LoginForm.module.css';

const LoginForm = () => {
  const [form, setForm] = useState({login: '', password: ''});
  const dispatch = useDispatch();
  const {request} = useHTTPRequest();
  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(signIn(form, request));
    setForm({login: '', password: ''});
  }
  return (
    <div className={s.wrap}>
      <form className={s.form} onSubmit={submitHandler}>
        <input placeholder='Введите логин' onChange={changeHandler} value={form.login}
               name='login'
               className={s.input}
               required={true}
        />
        <input placeholder='Введите пароль' onChange={changeHandler} value={form.password}
               name='password'
               className={s.input}
               type='password'
               required={true}
        />
        <div className={s.linkWrap}>
          <Link to='/registration' className={s.link}>регистарция</Link>
        </div>
        <button className={s.btn}>Войти</button>
      </form>
    </div>
  )
}
export default LoginForm