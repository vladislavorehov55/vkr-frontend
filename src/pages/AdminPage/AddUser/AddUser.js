import {useState} from "react";
import Select from "react-select";
import {useBtnDisabled} from "../../../userHooks/useBtnDisabled";
import s from "./AddUser.module.css";

const AddUser = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputs, setInputs] = useState({login: '', password: ''});
  const options = [
    {value: 'admin', label: 'Администратор'},
    {value: 'logist', label: 'Логист'},
    {value: 'driver', label: 'Водитель'}
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  }
  const inputsChangeHandler = (e) => {
    setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }
  const [btnDisabled, setBtnDisabled] = useBtnDisabled('/api/admin/add-user', 'POST',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
    },
    {...inputs, role: selectedOption ? selectedOption.value : null}, () => {
      setInputs({login: '', password: ''});
      setSelectedOption(null);
    });

  const submitHandler = (e) => {
    e.preventDefault();
    setBtnDisabled(true);
  }

  return (
    <div className={s.wrap}>
      <form onSubmit={submitHandler}>
        <div className={s.inputGroup}>
          <span>Введите имя пользователя</span>
          <input className={s.input}
                 name='login'
                 value={inputs.login}
                 onChange={inputsChangeHandler}
          />
        </div>
        <div className={s.inputGroup}>
          <span>Введите пароль</span>
          <input className={s.input} type='password'
                 name='password'
                 value={inputs.password}
                 onChange={inputsChangeHandler}
          />
        </div>
        <div className={s.selectWrap}>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder='Тип пользователя'
          />
        </div>
        <div className={s.btnWrap}>
          <button className={s.btn} disabled={btnDisabled}>Сохранить</button>
        </div>
      </form>
    </div>
  )
}
export default AddUser