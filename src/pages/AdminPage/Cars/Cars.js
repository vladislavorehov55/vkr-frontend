import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteCar, setCars} from "../../../redux/actions";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import {Link} from "react-router-dom";
import s from "../Users/Users.module.css";

const Cars = () => {
  const cars = useSelector(state => state.admin.cars);
  const dispatch = useDispatch();
  const {request} = useHTTPRequest();

  const deleteCarHandler = (id) => {
    dispatch(deleteCar(id, request));
  }

  useEffect(() => {
    dispatch(setCars(request))
  }, [])
  if (!cars.length) {
    return <h1 className={s.title}>Машины отсутстуют</h1>
  }
  return (
    <table className={s.table}>
      <thead>
      <tr>
        <th className={s.th}>Идентификатор</th>
      </tr>
      </thead>
      <tbody>
      {
        cars.map(car => {
          return (
            <tr key={car._id}>
              <td className={s.td}>
                <Link to={`/car/edit/${car._id}`}>{car._id}</Link>
                </td>
              <td className={s.td}
                  onClick={deleteCarHandler.bind(null, car._id)}
              >Удалить
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}
export default Cars