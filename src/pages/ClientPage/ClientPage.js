import {Navigate, Route, Routes} from "react-router-dom";
import AddBid from "./AddBid/AddBid";
import MyBids from "./MyBids/MyBids";
import Bid from "./Bid/Bid";
import s from './ClientPage.module.css';

const ClientPage = () => {
  return (
    <div className={s.pageWrap}>
      <Routes>
        <Route path='/' element={<AddBid/>}/>
        <Route path='/my-bids' element={<MyBids/>}/>
        <Route path='/bid/:id' element={<Bid/>}/>
        <Route path='*' element={<Navigate to='/' replace/>}/>
      </Routes>
    </div>
  )
}
export default ClientPage