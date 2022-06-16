import {
  DELETE_CAR, DELETE_USER, GET_BIDS,
  HIDE_ALERT,
  HIDE_LOADER, SET_CARS,
  SET_LOGIST_DATA,
  SET_USERS,
  SHOW_ALERT,
  SHOW_LOADER,
  SIGN_IN,
  SIGN_OUT
} from "./types";


export const authMe = (token, request) => {
  return async dispatch => {
    const json = await request('/api/auth/me', 'POST', {'Content-Type': 'application/json'}, token);
    if (json.error) return
    const {login: username, role, userID} = json.decodedToken;
    return dispatch({type: SIGN_IN, payload: {username, role, userID}})
  }
}
export const signIn = (data, request) => {
  return async dispatch => {
    dispatch(showLoader());
    const json = await request('https://app-200903.herokuapp.com/api/auth/signin', 'POST', {'Content-Type': 'application/json'}, data);
    dispatch(hideLoader());
    if (json.error) return
    localStorage.setItem('userData', JSON.stringify({jwtToken: json.token}))
    return dispatch({type: SIGN_IN, payload: {username: json.login, role: json.role, userID: json.userID}});

  }
}
export const signOut = () => {
  localStorage.removeItem('userData');
  return {type: SIGN_OUT}
}
export const registerClient = (data, request) => {
  return async dispatch => {
    const json = await request('/api/auth/register', 'POST', {'Content-Type': 'application/json'}, data);
    if (json.error) return
    localStorage.setItem('userData', JSON.stringify({jwtToken: json.token}));
    dispatch({type: SIGN_IN, payload: {username: json.login, role: json.role, userID: json.userID}});
  }
}
/// actions for Alert
export const showAlert = (type, message) => {
  return {
    type: SHOW_ALERT,
    payload: {type, message}
  }
}
export const hideAlert = () => {
  return {type: HIDE_ALERT}
}

/// actions for Client
export const getBids = (userID, request) => {
  return async dispatch => {
    const json = await request('/api/client/my-bids', 'POST',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
      }, {userID});
    return dispatch({type: GET_BIDS, payload: {bids: json.bids}})
  }
}

/// actions for Loader
export const showLoader = () => {
  return {type: SHOW_LOADER}
}
export const hideLoader = () => {
  return {type: HIDE_LOADER}
}

///actions for logist
export const setLogistData = (request) => {
  return async dispatch => {
    const json = await request('/api/logist', 'GET',
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
      }
    );
    if (json.error) {
      return
    }
    return dispatch({type: SET_LOGIST_DATA, payload: json.data})
  }
}
/// actions for admin
export const setUsers = (request) => {
  return async dispatch => {
    const json = await request('/api/admin/get-users', 'GET',
      {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`});
    return dispatch({type: SET_USERS, payload: json.users})
  }
}
export const deleteUser = (id, request) => {
  return async dispatch => {
    const json = await request('api/admin/delete-user', 'POST', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
    }, {id})
    return dispatch({type: DELETE_USER, payload: json.users})
  }
}

export const setCars = (request) => {
  return async dispatch => {
    const json = await request('/api/admin/get-cars', 'GET', {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
    });
    return dispatch({type: SET_CARS, payload: json.cars})
  }
}
export const deleteCar = (id, request) => {
  return async dispatch => {
    const json = await request('/api/admin/delete-car', 'POST', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).jwtToken}`
    }, {id});
    return dispatch({type: DELETE_CAR, payload: json.cars})
  }
}