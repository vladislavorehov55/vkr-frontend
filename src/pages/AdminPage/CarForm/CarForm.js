import {useEffect, useState} from "react";
import Select from "react-select";
import {useBtnDisabled} from "../../../userHooks/useBtnDisabled";
import {useNavigate, useParams} from "react-router-dom";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import s from './CarForm.module.css';

const CarForm = () => {
  const [inputs, setInputs] = useState({
    model: '',
    age: '',
    mileage: '',
    maxWeightInCar: '',
    standardFuelConsumption: '',
  });

  const {id} = useParams();
  const {request} = useHTTPRequest();
  const navigate = useNavigate();
  useEffect(() => {
    (async function() {
      if (id) {
        const {jwtToken} = JSON.parse(localStorage.getItem('userData'));
        const json = await request(`/api/admin/get-car/${id}`, 'GET',
          {Authorization: `Bearer ${jwtToken}`});
        const option = json.car.fuelType === 'бензин' ? {value: 'бензин', label: 'Бензин'} : {value: 'дизель', label: 'Дизель'};
          setInputs(json.car);
        setSelectedOption(option);
        console.log('json', json)
      }
    })()

  },[])

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
  const urlRequest = id ? '/api/admin/update-car' : '/api/admin/add-car';
  const bodyRequest = id ? {...inputs, fuelType: selectedOption ? selectedOption.value : null, id} : {...inputs, fuelType: selectedOption ? selectedOption.value : null};
  const cb = !id ? (json) => {
    setInputs({model: '', age: '', mileage: '', maxWeightInCar: '', standardFuelConsumption: ''});
    setSelectedOption(null)
  } : () => navigate('/');
  const [btnDisabled, setBtnDisabled] = useBtnDisabled(urlRequest, 'POST',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
    }, bodyRequest, cb)

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
export default CarForm