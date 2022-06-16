import s from './Modal.module.css'
const Modal = (props) => {
  return (
    <div className={s.overlay}>
      {props.children}
    </div>
  )
}
export default Modal