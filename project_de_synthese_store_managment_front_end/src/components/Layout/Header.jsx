import React from "react";
import styled from "styled-components";
import { FlexContainer, StyledButton } from "../../styles";
import { BiUpload } from "react-icons/bi";
import { StyledLinks } from "../../styles/styled-header";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth-slice";

const StyledHeader = styled.header`
  width: 100%;
`;

const StyledBgimageContainer = styled.div`
  background-color: var(--dark-100);
  width: 100%;
  aspect-ratio: 1/0.2;
  position: relative;
  // max-height: 300px;
  input {
    position: absolute;
    inset: 0 0 0 0;
    opacity: 0;
    &:hover,
    &:focus {
      cursor: pointer;
    }
    z-index: 10;
  }

  button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
  }

  img {
    width: 100%;
    max-height: 100%;
    aspect-ratio: 1/0.2;
    object-fit: cover;
  }
`;

const StyledNav = styled.div`
  background-color: var(--dark-700);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--white);
  padding-inline: var(--spacing-xxl);
  h3 {
    font-weight: 300;
  }
`;

const StyledAvatar = styled.div`
  position: relative;
  width: 50px;
  aspect-ratio: 1 / 1;
  background-color: var(--white);
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: fill;
  }

  input {
    position: absolute;
    inset: 0 0 0 0;
    opacity: 0;
    z-index: 10;

    &:hover,
    &:focus {
      cursor: pointer;
    }
  }

  button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const logOutHAndler = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <StyledHeader>
      <StyledBgimageContainer>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/images/bg-image-size.jpg`}
          crossOrigin="anonymous"
          alt=""
        />
        <input type="file" accept="image/*" name="bgImg" />
        <StyledButton bgColor="var(--white)" color="var(--dark-800)">
          <BiUpload />
        </StyledButton>
      </StyledBgimageContainer>
      <StyledNav>
        <FlexContainer>
          <StyledAvatar>
            <img src={""} alt="" />
            <input type="file" accept="image/*" name="avatar" />
            <StyledButton bgColor="transparent" color="var(--dark-800)">
              <BiUpload />
            </StyledButton>
          </StyledAvatar>
          <h3>{name}</h3>
        </FlexContainer>
        <StyledNav>
          <StyledLinks>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/orders">Orders</Link>
            <button onClick={logOutHAndler}>Log out</button>
          </StyledLinks>
        </StyledNav>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
