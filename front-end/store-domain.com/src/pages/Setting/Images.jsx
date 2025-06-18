import React, { useState } from "react";
import styled from "styled-components";
import { FlexContainer, StyledButton } from "../../styles";
import { BiUpload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const StyledStorePreview = styled.div`
  width: 100%;
`;

const StyledBgimage = styled.div`
  background-color: var(--dark-100);
  width: 100%;
  aspect-ratio: 1/0.2;
  position: relative;

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
    aspect-ratio: 1/0.2;
    object-fit: cover;
  }
`;

const StyledPreviewHeader = styled.header`
  background-color: var(--dark-700);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--white);
  padding-left: var(--spacing-xxl);
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

const Images = () => {
  const store = useSelector((state) => state.store.store);
  const [avatar, setAvatar] = useState("");

  const changeBgImage = (e) => {
    const formdata = new FormData();
    formdata.append("bg_image", e.target.files[0]);
  };

  const changeAvatarImage = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    console.log(store);
  }, [store]);

  return (
    <>
      <StyledStorePreview>
        <StyledBgimage>
          <img
            src={
              store.bg_image ||
              `${process.env.REACT_APP_BASE_URL}/images/bg-image-size.jpg`
            }
            crossOrigin="anonymous"
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            name="bgImg"
            onChange={changeBgImage}
          />
          <StyledButton bgColor="var(--white)" color="var(--dark-800)">
            <BiUpload />
          </StyledButton>
        </StyledBgimage>
        <StyledPreviewHeader>
          <FlexContainer>
            <StyledAvatar>
              <img src={avatar} alt="" />
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={changeAvatarImage}
              />
              <StyledButton bgColor="transparent" color="var(--dark-800)">
                <BiUpload />
              </StyledButton>
            </StyledAvatar>
            <h3>{store.name}</h3>
          </FlexContainer>
        </StyledPreviewHeader>
      </StyledStorePreview>
    </>
  );
};

export default Images;
