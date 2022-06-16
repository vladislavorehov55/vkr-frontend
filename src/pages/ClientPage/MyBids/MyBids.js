import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import {getBids} from "../../../redux/actions";
import s from './MyBids.module.css';

const MyBids = () => {
  const userID = useSelector(state => state.app.userID);
  const bids = useSelector(state => state.client.bids);
  const dispatch = useDispatch();
  const {request} = useHTTPRequest();

  useEffect(() => {
    dispatch(getBids(userID, request));
  }, [])
  if (!bids.length) {
    return <h1>Заявок нет</h1>
  }
  return (
    <ul className={s.list}>
      {
        bids.map(bid => <li key={bid._id}><Link to={`/bid/${bid._id}`} className={s.link}>{bid._id}</Link></li>)
      }
    </ul>
  )
}
export default MyBids