import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AuthPage from "./pages/AuthPage/AuthPage";
import Alert from "./components/Alert/Alert";
import AdminPage from "./pages/AdminPage/AdminPage";
import Header from "./components/Header/Header";
import ClientPage from "./pages/ClientPage/ClientPage";
import Loader from "./components/Loader/Loader";
import LogistPage from "./pages/LogistPage/LogistPage";
import {authMe} from "./redux/actions";
import DriverPage from "./pages/DriverPage/DriverPage";
import {useHTTPRequest} from "./userHooks/useHTTPRequest";
import './App.css';

function App() {
  const isAuth = useSelector(state => state.app.isAuth);
  const role = useSelector(state => state.app.role);
  const isLoading = useSelector(state => state.loader.isShowed);
  const location = useLocation();
  const dispatch = useDispatch();
  const {request} = useHTTPRequest();
  const getRoutes = () => {
    if (isLoading) {
      return <Loader/>
    }
    if (isAuth) {
      switch (role) {
        case 'admin':
          return <AdminPage/>
        case 'logist':
          return <LogistPage/>
        case 'client':
          return <ClientPage/>
        case 'driver':
          return <DriverPage/>
      }
    } else {
      return <AuthPage/>
    }
  }

  useEffect(() => {
    if (location.pathname.includes('registration')) {
      return
    }
    const token = JSON.parse(localStorage.getItem('userData'));
    if (token) {
      dispatch(authMe(token, request))
    }
  }, [])

  return (
    <div className='app'>
      <Alert/>
      <Header/>
      {
        getRoutes()
      }
    </div>
  )
}

export default App;
