import React, { useState } from "react";
import { StyledInputGroup } from "../../../styles";

const StorePassword = ({ setCanContinue, data, changeHandler }) => {
  const [password, setPassword] = useState("");
  const [crPassword, setCrPassword] = useState("");

  const passwordRegix =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const passwordChangeHandler = (e) => {
    changeHandler(e);
    setPassword(e.target.value);
  };

  const crPasswordChangeHandler = (e) => {
    changeHandler(e);
    setCrPassword(e.target.value);
    if (passwordRegix.test(password) && password === e.target.value)
      return setCanContinue(true);
  };

  return (
    <div>
      <StyledInputGroup>
        <label htmlFor="password">
          <h3>Enter Your Password</h3>
        </label>
        <input
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />
      </StyledInputGroup>
      <StyledInputGroup>
        <label htmlFor="password-conf">
          <h3>Verify Your Password</h3>
        </label>
        <input
          type="password"
          id="password-conf"
          value={crPassword}
          onChange={crPasswordChangeHandler}
        />
      </StyledInputGroup>
      <p>
        Password should consist of at 1 lowercase alphabetical character,1
        uppercase alphabetical character, 1 numeric character, at least one
        special [!@#$%^&*] and at least 8 character long.
      </p>
    </div>
  );
};

export default StorePassword;
