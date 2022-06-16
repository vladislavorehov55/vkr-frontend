import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {setLogistData, showAlert} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import s from './MainPage.module.css'


const MainPage = (props) => {
  const [title, setTitle] = useState('Нет заявок для обработки');
  const dispatch = useDispatch();
  const data = useSelector(state => state.logist.data);
  const {request} = useHTTPRequest();

  useEffect(() => {
    // const [hours, minutes] = [new Date().getHours(), new Date().getMinutes()]
    // if (8 <= hours && hours <= 10 || ([8,9,10].includes(hours) && minutes > 0)) {
    //   dispatch(setLogistData(request));
    //   return
    // }
    // setTitle('Обработка заявок еще не началась');
    const id = localStorage.getItem('prevUrl');
    localStorage.removeItem('prevUrl');
    if (id) {
      (async function () {
        const json = await request(`/api/logist/address-check/${id}`, 'GET',
          {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
          })
        dispatch(showAlert('warning', json.message));
        dispatch(setLogistData(request));
      })()
      return
    }
    dispatch(setLogistData(request));
  }, [])


  if (!data.length) {
    return <h1 className={s.title}>{title}</h1>
  }
  return (
    <ul className={s.list}>
      {
        data.map((item, ind) => {
          return (
            <li key={ind} className={s.listItem}>
              <Link to={`/address/${item.id}`} className={s.link}>Адрес № {ind + 1}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}
export default MainPage