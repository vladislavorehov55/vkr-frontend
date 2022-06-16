import {useEffect, useState} from "react";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import s from './GoodInfo.module.css';

const GoodInfo = ({address, closeGoodInfoWindow}) => {
  const [goods, setGoods] = useState([]);
  const {request} = useHTTPRequest();
  useEffect(() => {
    (async function () {
      const json = await request('/api/driver/goods', 'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
        }, {address});
      setGoods(json.goods)

    })()
  }, [])

  return (
    <div className={s.window}>
      <div className={s.close} onClick={closeGoodInfoWindow}>&times;</div>
      <h1>Товары</h1>
      <ol>
        {
          goods.map((item, ind) => <li key={Date.now() + ind}>{item}</li>)
        }
      </ol>

    </div>
  )
}
export default GoodInfo