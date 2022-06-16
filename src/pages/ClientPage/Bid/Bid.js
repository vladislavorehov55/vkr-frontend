import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {showAlert} from "../../../redux/actions";
import SvgGenerator from "../../../components/SvgGenerator/SvgGenerator";
import {useNavigate, useParams} from "react-router-dom";
import {useHTTPRequest} from "../../../userHooks/useHTTPRequest";
import s from "../AddBid/AddBid.module.css";


const Bid = () => {
  const userID = useSelector(state => state.app.userID);
  const [addresses, setAddresses] = useState({});
  const [weight, setWeight] = useState({});
  const [productsNames, setProductsNames] = useState({});

  const [isError, setIsError] = useState(false);

  const isChanged = useRef(false);

  const navigate = useNavigate();
  const {id: bidID} = useParams();
  const dispatch = useDispatch();

  const changeHandler = e => {
    isChanged.current = true;
    const {name, value} = e.target;
    if (name.includes('weight')) {
      setWeight({...weight, [name]: value});
      return
    } else if (name.includes('productName')) {
      setProductsNames({...productsNames, [name]: value})
      return
    }
    setAddresses({...addresses, [name]: value})
  }
  const addAddress = () => {
    isChanged.current = true;
    const ind = Object.keys(addresses).length + 1;
    setAddresses({...addresses, [`address${ind}`]: ''});
    setWeight({...weight, [`weight${ind}`]: ''});
    setProductsNames(prevState => ({...prevState, [`productName${ind}`]: ''}))
  }

  const removeAddressHandler = (ind) => {
    isChanged.current = true;
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
  const editBidHandler = async () => {
    const [hours, minutes] = [new Date().getHours(), new Date().getMinutes()];
    if (8 <= hours && hours <= 10 || ([8, 9, 10].includes(hours) && minutes > 0)) {
      setIsError(true);
      return
    }
    if (!isChanged.current) {
      dispatch(showAlert('warning', 'Вы не сделали никаких изменений'));
      return
    }
    request('/api/client/edit-bid', 'POST',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
      }, {bidID, userID, addresses, weight, productsNames})
    navigate('/my-bids')
  }

  const {request} = useHTTPRequest();
  const deleteBidHandler = () => {
    request(`/api/client/bid`, 'DELETE',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
      }, {id: bidID});
    navigate('/my-bids')
  }

  useEffect(() => {
    (async function () {
      const {addresses, weight, productsNames} = await request(`/api/client/bid/${bidID}`, 'GET',
        {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
        });
      console.log(addresses, weight, productsNames)
      setAddresses(addresses);
      setWeight(weight);
      setProductsNames(productsNames)
    })()
  }, [])
  return (
    <>
      {
        isError === true ? <h1>Извините, заявки больше нельзя изменить</h1> :
          <div>
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
            <button onClick={addAddress} className={`${s.btn}`}>Добавить адрес</button>
            <button onClick={editBidHandler} className={`${s.btn}`}>Сохранить изменения</button>
            <button onClick={deleteBidHandler} className={`${s.btn}`}>Удалить заявку</button>
          </div>
      }
    </>
  )
}
export default Bid