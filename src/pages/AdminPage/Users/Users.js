import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUsers, deleteUser} from "../../../redux/actions";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import s from './Users.module.css';

const Users = () => {
  const users = useSelector(state => state.admin.users);
  const dispatch = useDispatch();
  const {request} = useHTTPRequest();


  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id, request))
  }
  useEffect(() => {
    dispatch(setUsers(request))
  }, [])
  return (
    <table className={s.table}>
      <thead>
      <tr>
        <th className={s.th}>Логин</th>
        <th className={s.th}>Роль</th>
      </tr>
      </thead>
      <tbody>
      {
        users.map(user => {
          return (
            <tr key={user._id}>
              <td className={s.td}>{user.login}</td>
              <td className={s.td}>{user.role}</td>
              <td className={s.td}
                  onClick={deleteUserHandler.bind(null, user._id)}
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
export default Users