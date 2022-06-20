import {useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import {useBtnDisabled} from "../../../userHooks/useBtnDisabled";
import s from './DistanceMatrix.module.css';


const DistanceMatrix = () => {
  const [data, setData] = useState({});
  const [inputs, setInputs] = useState({})
  const {id} = useParams();
  const navigate = useNavigate();
  const {request} = useHTTPRequest();
  const [btnDisabled, setBtnDisabled] = useBtnDisabled(`/api/logist/address-save/${id}`, 'POST',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
    }, inputs, () =>  navigate('/'));
  const isBtnClicked = useRef(false)

  const changeHandler = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }
  const clickBtnHandler = () => {
    isBtnClicked.current = true;
    setBtnDisabled(true);
  }
  useEffect(() => {
    (async function () {
      const json = await request(`/api/logist/address/${id}`, 'GET', {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
      });
      const inputs = {};
      Object.values(json.addresses).forEach((_, ind) => inputs[`input${ind + 1}`] = '');
      setInputs(inputs);
      setData(json);
    })()
  }, []);

  useEffect(() => {
    return () => {
      if (isBtnClicked.current) return
      localStorage.setItem('prevUrl', `${id}`);
    }
  }, [])

  if (!data.address) return '';
  return (
    <div className={s.wrap}>
      <h1 className={s.title}>Адрес пункта отправки : {data.address}</h1>
      <div className={s.tableWrap}>
        <div className={s.leftBlock}>
          <div className={`${s.leftBlockTitle} ${s.td}`}>F</div>
          {
            data.addresses.map((address, ind) => <div key={ind} className={s.td}>{address}</div>)
          }
        </div>

        <div>
          <div className={`${s.td}`}>{data.address}</div>
          {
            data.addresses.map((address, ind) => (
              <div key={ind} className={`${s.td}`}>
                {
                  data.address === address ?
                    <span>0</span> :
                    <input placeholder='Введите расстояние в км' name={`input${ind + 1}`}
                           value={inputs[`input${ind + 1}`]}
                           onChange={changeHandler}
                           className={s.input}
                    />
                }
              </div>
            ))
          }
        </div>
      </div>
      {/*<button onClick={clickBtnHandler} className={s.btn} disabled={isBtnDisabled.current}>Сохранить расстояния</button>*/}
      <button onClick={clickBtnHandler} className={s.btn} disabled={btnDisabled}>Сохранить расстояния</button>
    </div>
  )
}
export default DistanceMatrix