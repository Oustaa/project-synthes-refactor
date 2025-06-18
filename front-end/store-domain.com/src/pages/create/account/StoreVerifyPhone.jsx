import React from "react";
import { useState } from "react";
import { StyledInputGroup } from "../../../styles";
import { useEffect } from "react";
import axios from "axios";

function sendMSG(phone, secretXKey, errorHandler, successHandler) {
  const options = {
    method: "POST",
    url: "https://wipple-sms-verify-otp.p.rapidapi.com/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": secretXKey,
      "X-RapidAPI-Host": "wipple-sms-verify-otp.p.rapidapi.com",
    },
    data: JSON.stringify({
      app_name: "Domain.com",
      code_length: 6,
      code_type: "number",
      expiration_second: 86000,
      phone_number: "0641679994",
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      successHandler(true);
    })
    .catch(function (error) {
      errorHandler(error);
    });
}

function codeVerification(
  phone,
  code,
  secretXKey,
  errorHandler,
  successHandler
) {
  const options = {
    method: "GET",
    url: "https://wipple-sms-verify-otp.p.rapidapi.com/verify",
    params: {
      phone_number: phone,
      verification_code: code,
      app_name: "domain.com",
    },
    headers: {
      "X-RapidAPI-Key": secretXKey,
      "X-RapidAPI-Host": "wipple-sms-verify-otp.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response);
      successHandler(response.data);
    })
    .catch(function (error) {
      console.log(error);
      errorHandler(error);
    });
}

const StorePhone = ({ setCanContinue, data, changeHandler }) => {
  const [phone, setPhone] = useState("");
  const [codeSend, setCodeSent] = useState(false);
  const [code, setCode] = useState(false);

  const handelChange = (e) => {
    changeHandler(e);
    const regexPhoneNumber = /^((\+)33|0)[1-9](\d{2}){4}$/;

    if (e.target.value.match(regexPhoneNumber)) {
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
    setPhone(e.target.value);
  };

  useEffect(() => {
    const secretXKey = process.env.REACT_APP_RAPID_API_X_KEY;
    if (data.phone_number) setPhone(data.phone_number);
    sendMSG("0641679994", secretXKey);
  }, []);

  return (
    <div>
      <StyledInputGroup>
        <label htmlFor="phone">
          <h3>Enter Your Phone Number in</h3>
        </label>
        <input
          name="phone_number"
          id="phone_number"
          type="text"
          value={phone}
          onChange={handelChange}
        />
      </StyledInputGroup>
    </div>
  );
};

export default StorePhone;
