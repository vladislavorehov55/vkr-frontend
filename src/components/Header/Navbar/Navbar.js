import {Link} from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = ({role}) => {
    switch (role) {
      case 'admin':
        return (
          <nav>
            <ul className={s.menu}>
              <li className={s.menuItem}>
                Добавить
                <ul className={s.submenu}>
                  <li className={s.submenuItem}>
                    <Link to='/' className={s.link}>Пользователя</Link>
                  </li>
                  <li className={s.submenuItem}>
                    <Link to='/add/car' className={s.link}>Машину</Link>
                  </li>
                </ul>
              </li>
              <li className={s.menuItem}>
                Просмотреть
                <ul className={s.submenu}>
                  <li className={s.submenuItem}>
                    <Link to='/users' className={s.link}>Пользователи</Link>
                  </li>
                  <li className={s.submenuItem}>
                    <Link to='/cars' className={s.link}>Машины</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        )
      case 'client':
        return (
          <nav className={s.nav}>
            <ul className={s.menu}>
              <li className={s.menuItem}>
                <Link className={s.link} to='/'>Добавить</Link>
              </li>
              <li className={s.menuItem}>
                <Link className={s.link} to='/my-bids'>Мои заявки</Link>
              </li>
            </ul>
          </nav>
        )
      default:
        return ''
    }
}
export default Navbar