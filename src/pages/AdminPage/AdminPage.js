import {Routes, Route} from 'react-router-dom'
import AddUser from "./AddUser/AddUser";
import Users from "./Users/Users";
import AddCar from "./AddCar/AddCar";
import Cars from "./Cars/Cars";
import CarForm from "./CarForm/CarForm";

const AdminPage = () => {
  return (
    <Routes>
      <Route path='/' element={<AddUser/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/add/car' element={<CarForm/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/car/edit/:id' element={<CarForm/>}/>
    </Routes>
  )
}
export default AdminPage