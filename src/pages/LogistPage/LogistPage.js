import {Routes, Route} from 'react-router-dom';
import MainPage from "./MainPage/MainPage";
import DistanceMatrix from "./DistanceMatrix/DistanceMatrix";

const LogistPage = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/address/:id' element={<DistanceMatrix/>}/>
    </Routes>
  )
}
export default LogistPage