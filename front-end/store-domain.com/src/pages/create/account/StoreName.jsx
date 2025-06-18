import React, { useEffect, useState } from "react";
import { StyledInputGroup } from "../../../styles";

const StoreName = ({
  setCanContinue,
  data,
  changeHandler,
  setFilters,
  setLimit,
  error,
  setError,
}) => {
  const [name, setName] = useState("");

  const handelChange = (e) => {
    changeHandler(e);
    setError(false);
    setName(e.target.value);
    setFilters({ name: e.target.value });
    setLimit(1);
  };

  useEffect(() => {
    if (data.name.length >= 6) setCanContinue(true);
    else setCanContinue(false);
    setFilters({ name });
    setLimit(1);
  }, [data]);

  return (
    <>
      <StyledInputGroup className={error && "invalid"}>
        <label htmlFor="">
          <h3>Enter your store name</h3>
        </label>
        <input
          name="name"
          type="text"
          value={data.name}
          onChange={handelChange}
        />
        <p>
          {error
            ? "The entred name is found please try another name please."
            : " Your store name should be unique, and consists of at least 6 characters. and please keep in mind that it should be easy to remember"}
        </p>
      </StyledInputGroup>
    </>
  );
};

export default StoreName;
