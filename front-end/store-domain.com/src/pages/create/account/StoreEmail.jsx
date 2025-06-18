import React, { useEffect, useState } from "react";
import { StyledInputGroup } from "../../../styles";

import axios from "axios";

const StoreEmailPhone = ({
  setCanContinue,
  data,
  changeHandler,
  setFilters,
  setLimit,
  error,
  setError,
}) => {
  const handelChange = (e) => {
    setError(false);
    changeHandler(e);
    setFilters({ email: e.target.value });
    setLimit(1);
    if (data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      console.log("Send Validation code");
      setCanContinue(true);
    } else setCanContinue(false);
  };

  useEffect(() => {
    if (data.email_verified) setCanContinue(true);
    setFilters({ email: data.email });
    if (data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
      setCanContinue(true);
    else setCanContinue(false);
  }, []);

  return (
    <>
      <StyledInputGroup className={error && "invalid"}>
        <label htmlFor="email">
          <h3>Enter Your Email</h3>
        </label>
        <input
          name="email"
          id="email"
          type="email"
          value={data.email}
          onChange={handelChange}
        />
        <p>
          {error &&
            "The entred email is alredy related to another store, please try another one, or if the email is yours try log in."}
        </p>
      </StyledInputGroup>
    </>
  );
};

export default StoreEmailPhone;
