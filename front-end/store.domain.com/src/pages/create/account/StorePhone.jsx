import React from "react";
import { useState } from "react";
import { StyledInputGroup } from "../../../styles";
import { useEffect } from "react";
import axios from "axios";

function sendMSG(phone, secretXKey, errorHandler, successHandler) {
  console.log(phone, secretXKey);
  const options = {
    method: "POST",
    url: "https://wipple-sms-verify-otp.p.rapidapi.com/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": secretXKey,
      "X-RapidAPI-Host": "wipple-sms-verify-otp.p.rapidapi.com",
    },
    data: `
    {"app_name":"Domain.com","code_length":6,"code_type":"number","expiration_second":86000,"phone_number":${phone}}
    `,
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
  const [error, setError] = useState("");

  const handelChange = (e) => {
    changeHandler(e);
    const regexPhoneNumber = /^\+?\d{10,14}$/;

    if (e.target.value.match(regexPhoneNumber)) {
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
    setPhone(e.target.value);
  };

  useEffect(() => {
    if (data.phone_number) setPhone(data.phone_number);
  }, []);

  return (
    <>
      <StyledInputGroup>
        <label htmlFor="phone">
          <h3>Enter Your Phone Number</h3>
        </label>
        <input
          name="phone_number"
          id="phone_number"
          type="text"
          value={phone}
          onChange={handelChange}
        />
        <p>E164 format phone number excluding the leading +</p>
      </StyledInputGroup>
      {codeSend && (
        <StyledInputGroup>
          <label htmlFor="phone-conf">
            <h3>Verify your phone Number</h3>
          </label>
          <input
            name="verifyCode"
            type="phone"
            id="phone-conf"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </StyledInputGroup>
      )}
    </>
  );
};

export default StorePhone;
