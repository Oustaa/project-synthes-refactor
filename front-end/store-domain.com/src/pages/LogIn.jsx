import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/auth-slice";
import { useNavigate, Link } from "react-router-dom";
import {
  StyledInputGroup,
  StyledContainer,
  StyledButton,
  FlexContainer,
} from "../styles";
import { ClipLoader } from "react-spinners";

const StyledLogInImgContainer = styled.form`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogInPage = styled.div`
  display: flex;
  height: 100vh;
`;

const StyledForm = styled.form`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  a {
    text-decoration: underline;
    color: inherit;
    margin-top: var(--spacing-lg);
  }
`;

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [storeInfo, setStoreInfo] = useState({
    password: "",
    password_valid: true,
    email: "",
    email_valid: true,
  });

  const [loading, setLoading] = useState(false);

  const changehandler = (e) => {
    const name = e.target.name;

    setStoreInfo((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const respons = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/stores/login`,
        storeInfo
      );

      const data = await respons.data;
      console.log(data);
      if (data.accessToken && data.name) {
        localStorage.setItem("token", data.accessToken);
        dispatch(login({ token: data.accessToken }));
        return navigate("/");
      }
    } catch (error) {
      const errorResponse = error?.response;
      if (errorResponse?.status === 400) {
        if (!errorResponse?.data?.email)
          setStoreInfo((prev) => {
            return { ...prev, email_valid: false };
          });
        else if (!errorResponse?.data?.password)
          setStoreInfo((prev) => {
            return { ...prev, password_valid: false };
          });
      } else if (errorResponse?.status === 307)
        return navigate("/store/reativate");
    } finally {
      setLoading(false);
    }
  };

  async function demoLogInHandler() {
    const respons = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/auth/stores/login/demo`
    );

    const data = await respons.data;
    console.log(data);
    localStorage.setItem("token", data.accessToken);
    dispatch(login({ token: data.accessToken }));
    return navigate("/");
  }

  useEffect(() => {
    dispatch(login({ token }));
    if (token) navigate("/");
  }, [token, navigate, dispatch]);

  return (
    <StyledContainer>
      <StyledLogInPage>
        <StyledForm onSubmit={submitHandler}>
          <StyledInputGroup className={storeInfo.email_valid || "invalid"}>
            <label htmlFor="email">
              <h3>Store Email:</h3>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={storeInfo.email}
              onChange={changehandler}
            />
          </StyledInputGroup>
          <StyledInputGroup className={storeInfo.password_valid || "invalid"}>
            <label htmlFor="password">
              <h3>Password:</h3>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={storeInfo.password}
              onChange={changehandler}
            />
          </StyledInputGroup>
          <FlexContainer>
            <StyledButton>
              {!loading ? (
                "Log In"
              ) : (
                <ClipLoader color="var(--white)" size={20} />
              )}
            </StyledButton>
            <StyledButton onClick={demoLogInHandler} type="button">
              {!loading ? (
                "Try Demo"
              ) : (
                <ClipLoader color="var(--white)" size={20} />
              )}
            </StyledButton>
          </FlexContainer>
          <Link to="/create">Ou create a store</Link>
        </StyledForm>
        <StyledLogInImgContainer>
          <img
            src="./images/undraw_sign_up_n6im.svg"
            alt="undraw_sign_up_n6im.svg"
          />
        </StyledLogInImgContainer>
      </StyledLogInPage>
    </StyledContainer>
  );
};

export default LogIn;
