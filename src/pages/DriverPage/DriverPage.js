import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Modal from "../../components/Modal/Modal";
import GoodInfo from "./GoodInfo/GoodInfo";
import {useHTTPRequest} from "../../userHooks/useHTTPRequest";
import s from './DriverPage.module.css';


const DriverPage = () => {
  const [routeAddresses, setRouteAddresses] = useState([]);
  const driverID = useSelector(state => state.app.userID);
  const [address, setAddress] = useState(null);
  const {request} = useHTTPRequest();


  const openFoodInfoWindow = (address) => {
    setAddress(address);
  }
  const closeGoodInfoWindow = () => {
    setAddress(null);
  }
  const completeRoute = async () => {
    const json = await request('/api/driver/complete-route', 'POST',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
      }, {
        driverID,
        routeAddresses
      });
    if (json.error) return
    setRouteAddresses([]);
  }

  useEffect(() => {
    (async function () {
      const json = await request('/api/driver/', 'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
        }, {driverID});
      if (json.error) return
      setRouteAddresses(json.route)
    })()
  }, [])

  if (!routeAddresses.length) {
    return <h1 className={s.title}>Нет новых маршрутов</h1>
  }
  return (
    <div className={s.pageWrap}>
      {
        address &&
        <Modal>
          <GoodInfo address={address} closeGoodInfoWindow={closeGoodInfoWindow}/>
        </Modal>
      }
      <ol>
        {
          routeAddresses.map((address, ind) => <li key={Date.now() + ind}
                                                   onClick={openFoodInfoWindow.bind(null, address)}>{address}</li>)
        }
      </ol>
      <button onClick={completeRoute} className={s.btn}>Завершить</button>
    </div>

  )
}
export default DriverPage