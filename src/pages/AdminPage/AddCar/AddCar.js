import {useState} from "react";
import Select from "react-select";
import {useBtnDisabled} from "../../../userHooks/useBtnDisabled";
import s from './AddCar.module.css'

const AddCar = () => {
  const [inputs, setInputs] = useState({
    model: '',
    age: '',
    mileage: '',
    maxWeightInCar: '',
    standardFuelConsumption: '',
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    {value: 'бензин', label: 'Бензин'},
    {value: 'дизель', label: 'Дизель'},
  ];

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setInputs(prevState => ({...prevState, [name]: value}))
  }
  const selectChangeHandler = (selectedOption) => {
    setSelectedOption(selectedOption)
  }
  const [btnDisabled, setBtnDisabled] = useBtnDisabled('/api/admin/add-car', 'POST',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
    },
    {...inputs, fuelType: selectedOption ? selectedOption.value : null}, (json) => {
      setInputs({model: '', age: '', mileage: '', maxWeightInCar: '', standardFuelConsumption: ''});
      setSelectedOption(null)
    })
  const submitHandler = (e) => {
    e.preventDefault();
    setBtnDisabled(true);
  }
  return (
    <form onSubmit={submitHandler} className={s.form}>
      <div className={s.inputGroup}>
        <label className={s.label}>Введите модель машины</label>
        <div className={s.inputWrap}>
          <input className={s.input}
                 name='model'
                 value={inputs.model}
                 onChange={inputChangeHandler}
          />
        </div>

      </div>
      <div className={s.inputGroup}>
        <label className={s.label}>Введите возраст машины</label>
        <div className={s.inputWrap}>
          <input className={s.input}
                 name='age'
                 value={inputs.age}
                 onChange={inputChangeHandler}
          />
        </div>

      </div>
      <div className={s.inputGroup}>
        <label className={s.label}>Введите пробег машины в км</label>
        <div className={s.inputWrap}>
          <input className={s.input}
                 name='mileage'
                 value={inputs.mileage}
                 onChange={inputChangeHandler}
          />
        </div>

      </div>
      <div className={s.inputGroup}>
        <label className={s.label}>Введите грузоподъемность машины в кг</label>
        <div className={s.inputWrap}>
          <input className={s.input}
                 name='maxWeightInCar'
                 value={inputs.maxWeightInCar}
                 onChange={inputChangeHandler}
          />
        </div>

      </div>
      <div className={s.inputGroup}>
        <label className={s.label}>Введите стандартное потребление топлива в л/100км</label>
        <div className={s.inputWrap}>
          <input className={s.input}
                 name='standardFuelConsumption'
                 value={inputs.standardFuelConsumption}
                 onChange={inputChangeHandler}
          />
        </div>
      </div>
      <div className={s.inputGroup}>
        <label className={s.label}>Выберети тип топлива</label>
        <Select
          value={selectedOption}
          onChange={selectChangeHandler}
          options={options}
          placeholder='Тип топлива'
        />
      </div>
      <div>
        <button className={s.btn} disabled={btnDisabled}>Сохранить</button>
      </div>
    </form>
  )
}
export default AddCar