import {useDispatch} from "react-redux";
import {showAlert, signOut} from "../redux/actions";

export const useHTTPRequest = () => {
  const dispatch = useDispatch();
  const request = async (url, method = 'GET', headers = {}, body = null) => {
    if (headers['Content-Type'] === 'application/json' ) {
      body = JSON.stringify(body);
    }
    const response = await fetch(`https://app-200903.herokuapp.com${url}`, {method, body, headers});
    const json = await response.json();
    if (!response.ok) {
      dispatch(showAlert('warning', json.message));
      if (response.status === 401) {
        dispatch(signOut());
        return new Promise((resolve, reject) => reject(json))
      }
      return new Promise((resolve) => resolve(json))
    }
    if (json.message) {
      dispatch(showAlert('success', json.message));
    }
    return new Promise((resolve) => resolve(json))
  };
  return {request}
};