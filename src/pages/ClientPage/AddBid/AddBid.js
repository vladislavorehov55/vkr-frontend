import SvgGenerator from "../../../components/SvgGenerator/SvgGenerator";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useBtnDisabled} from "../../../userHooks/useBtnDisabled";

import s from "./AddBid.module.css";

const AddBid = () => {
  const userID = useSelector(state => state.app.userID);

  const [addresses, setAddresses] = useState({address1: ''});
  const [weight, setWeight] = useState({weight1: ''});
  const [productsNames, setProductsNames] = useState({productName1: ''});

  const [isError, setIsError] = useState(false);

  const [btnDisabled, setBtnDisabled] = useBtnDisabled('/api/client/add-bid', 'POST',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
    }, {userID, addresses, weight, productsNames},
    () => {
      setAddresses({address1: ''});
      setWeight({weight1: ''});
      setProductsNames({productName1: ''});
    }
  );
  const changeHandler = e => {
    const {name, value} = e.target;
    if (name.includes('weight')) {
      setWeight({...weight, [name]: value});
      return
    } else if (name.includes('productName')) {
      setProductsNames(prevState => ({...prevState, [name]: value}))
      return
    }
    setAddresses({...addresses, [name]: value})
  }
  const addAddress = () => {
    const ind = Object.keys(addresses).length + 1;
    setAddresses({...addresses, [`address${ind}`]: ''});
    setWeight({...weight, [`weight${ind}`]: ''});
    setProductsNames(prevState => ({...prevState, [`productName${ind}`]: ''}))
  }

  const removeAddressHandler = (ind) => {
    const newAddresses = {address1: ''};
    const newWeight = {weight1: ''};
    const newProductsNames = {productName1: ''};
    let key = 0;
    Object.entries(addresses).forEach((item, i) => {
      if (i !== ind) {
        newAddresses[`address${key + 1}`] = item[1];
        newWeight[`weight${key + 1}`] = weight[`weight${i + 1}`];
        newProductsNames[`productName${key + 1}`] = productsNames[`productName${key + 1}`];
        key += 1;
      }
    })
    setAddresses(newAddresses);
    setWeight(newWeight);
    setProductsNames(newProductsNames);
  }

  const addBidHandler = () => {
    // const [hours, minutes] = [new Date().getHours(), new Date().getMinutes()];
    // if (8 <= hours && hours <= 10 || ([8, 9, 10].includes(hours) && minutes > 0)) {
    //   setIsError(true);
    //   return
    // }
    setBtnDisabled(true);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === 'btn1') addAddress()
    else addBidHandler()
  }

  return (
    <>
      {
        isError === true ? <h1>Извините, прием заявок закончен</h1> :
          <form onSubmit={submitHandler}>
            {
              Object.keys(addresses).map((item, ind) => {
                return (
                  <div key={ind} className={s.rowWrap}>
                    <input value={productsNames[`productName${ind + 1}`]} name={`productName${ind + 1}`}
                           placeholder='Введите наименование товара'
                           onChange={changeHandler}
                           required={true}
                           className={`${s.input} ${s.inputProductName}`}
                    />
                    <input value={addresses[item]} name={item}
                           placeholder='Введите адрес'
                           onChange={changeHandler}
                           required={true}
                           className={`${s.input} ${s.inputAddress}`}
                    />
                    <input value={weight[`weight${ind + 1}`]} name={`weight${ind + 1}`}
                           placeholder='Введите вес доставки, в кг'
                           onChange={changeHandler}
                           required={true}
                           className={`${s.input} ${s.inputWeight}`}
                    />
                    {
                      Object.keys(addresses).length === 1 ? '' :
                        <span onClick={removeAddressHandler.bind(null, ind)} className={s.svgWrap}>
                          <SvgGenerator type='remove-address'/>
                        </span>
                    }

                  </div>
                )
              })
            }
            <button type='submit' name='btn1' className={`${s.btn}`} disabled={btnDisabled}>Добавить адрес</button>
            <button type='submit' name='btn2' className={`${s.btn}`} disabled={btnDisabled}>Оставить заявку</button>
          </form>
      }
    </>
  )
}
export default AddBid