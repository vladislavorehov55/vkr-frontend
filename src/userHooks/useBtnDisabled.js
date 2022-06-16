import {useEffect, useState} from "react";
import {useHTTPRequest} from "./useHTTPRequest";

export const useBtnDisabled = (url, method, headers, body, cb) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const {request} = useHTTPRequest();
  useEffect(() => {
    if (btnDisabled) {
      request(url, method, headers, body)
        .then(() => {
          setBtnDisabled(false)
          cb()
        })
        .catch(() => {})
    }
  }, [btnDisabled])
  return [btnDisabled, setBtnDisabled]
}