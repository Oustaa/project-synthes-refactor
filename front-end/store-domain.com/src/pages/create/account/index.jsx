import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth-slice";
import styled from "styled-components";
import StoreName from "./StoreName";
import StoreEmail from "./StoreEmail";
import StoreVerifyEmail from "./StoreVerifyEmail";
import StorePhone from "./StorePhone";
import StoreVerifyPhone from "./StoreVerifyPhone";
import StorePassword from "./StorePassword";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { StyledContainer, StyledButton } from "../../../styles";
import axios from "axios";
import { useEffect } from "react";

const StyledCreationHeaderFooter = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ end }) => (end ? "flex-end" : "space-between")};
  padding-block: var(--spacing-xl);
  color: var(--dark-800);
  h1,
  h2 {
    font-size: 1.3rem;
  }
`;

const StyledCreateBody = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    width: 100%;
    max-width: 900px;
  }
`;

const Components = [
  StoreName,
  StoreEmail,
  StoreVerifyEmail,
  StorePhone,
  StoreVerifyPhone,
  StorePassword,
];
const titles = [
  "Name",
  "Email",
  "Verify Your Email",
  "Phone number",
  "Verify Your Phone",
  "Password",
];

const CreateStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState({
    name: "",
    email: "",
    email_verified: false,
    password: "",
    phone_number: "",
    phone_verified: false,
  });
  const [step, setStep] = useState(0);
  const [canContinue, setCanContinue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [limit, setLimit] = useState(null);
  const [error, setError] = useState(false);

  let { token, name } = useSelector((state) => state.auth);

  if (!token && !name) {
    token = localStorage.getItem("token");
    name = localStorage.getItem("storename");
  }

  const RendredComp = Components[step];

  const nextHandler = () => {
    if (!canContinue) return;

    setStep((prev) => (prev += 1));
    setCanContinue(false);
  };

  const prevHandler = () => {
    setStep((prev) => (prev -= 1));
  };

  const changeHandler = (e) => {
    const name = e.target.name;

    setStoreData((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  const nextStep = (can, cb) => {
    setCanContinue(can);
  };

  const imageChnageHandler = (e) => {
    const name = e.target.name;

    setStoreData((prev) => {
      return { ...prev, [name]: e.target.files[0] };
    });
  };

  const verify = async () => {
    if (!canContinue || !filters || !limit) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/stores/exists`,
        {
          filter: filters,
          limit,
        }
      );

      const data = await response.data;
      if (!data.conflect) {
        nextHandler();
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const createStore = async (e) => {
    e.preventDefault();

    try {
      const respons = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/stores`,
        storeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await respons.data;
      console.log(responseData);
      if (responseData.token && responseData.name) {
        dispatch(login(responseData));
        navigate(`/login`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(login({ name, token }));
    if (name && token) navigate("/");
  }, [name, token, navigate, dispatch]);

  return (
    <StyledContainer>
      <StyledCreationHeaderFooter>
        <h1>Create Store</h1>
        <h2>
          <Link to="/login">Log In</Link>
        </h2>
        <h2>{titles[step]}</h2>
      </StyledCreationHeaderFooter>
      <StyledCreateBody>
        {
          <RendredComp
            setCanContinue={setCanContinue}
            changeHandler={changeHandler}
            imageChnageHandler={imageChnageHandler}
            data={storeData}
            setFilters={setFilters}
            setLimit={setLimit}
            error={error}
            setError={setError}
          />
        }
      </StyledCreateBody>
      <StyledCreationHeaderFooter end={step === 0 ? "end" : ""}>
        {step !== 0 && (
          <StyledButton onClick={prevHandler} bgColor="var(--dark-500)">
            Prev
          </StyledButton>
        )}
        {step === 5 ? (
          <form encType="multipart/form-data" onSubmit={createStore}>
            <StyledButton type="submit">Create</StyledButton>
          </form>
        ) : (
          <StyledButton
            bgColor={!canContinue ? "var(--dark-500)" : "var(--primary-dark)"}
            onClick={verify}
          >
            {!loading ? "Next" : <ClipLoader size={"1.3rem"} color="#fff" />}
          </StyledButton>
        )}
      </StyledCreationHeaderFooter>
    </StyledContainer>
  );
};

export default CreateStore;
