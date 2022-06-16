import {Routes, Route, Navigate} from 'react-router-dom';
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import LoginForm from "./LoginForm/LoginForm";
// последний роут нужен, чтобы при выходе с любой странциы, которая не совпадате с '/', происходил
// переход на LoginForm
const AuthPage = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/registration' element={<RegistrationForm/>}/>
      <Route path='*' element={<Navigate to='/' replace/>}/>
    </Routes>
  )
}
export default AuthPage