import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsXCircle } from "react-icons/bs";
import { useSelector } from "react-redux";

const StyledImagesContainer = styled.div`
  width: 50%;
`;

const StyledBigImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 0.8;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: contain;
    width: 100%;
    aspect-ratio: 1 / 0.8;
  }
`;

const StyledImages = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-sm);
  border-radius: var(--radius-lg);

  div {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm);

    img {
      object-fit: contain;
      width: 100%;
      aspect-ratio: 1 / 0.8;
    }

    &:hover {
      cursor: pointer;
    }

    &.selected {
      border-bottom: 1px solid var(--dark-700);
    }

    button {
      background-color: transparent;
      color: var(--dark-800);
      border: none;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const STyledImagePreview = styled.div`
  width: 100%;
  aspect-ratio: 1 / 0.8;
  background-color: var(--dark-000);
  border: 1px dashed var(--dark-400);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;

  h4 {
    width: 80%;
    text-align: center;
  }
`;

const Images = ({ images, setImages, type }) => {
  const storename = useSelector((state) => state.store.store.name);
  const [imgsUrls, setImagesUrls] = useState([]);
  const [displayedImage, setDisplayedImage] = useState(0);

  useEffect(() => {
    if (type !== "display")
      setImagesUrls(() => {
        return Object.values(images).map((image) => URL.createObjectURL(image));
      });
    else
      setImagesUrls(
        images.map((image) => {
          return `${process.env.REACT_APP_BASE_URL}/images/${storename}/products/${image}`;
        })
      );
  }, [images]);

  const deleteImage = (id) => {
    setImages((prev) => prev.filter((image, i) => i !== id));
    console.log(displayedImage, imgsUrls.length);
    if (displayedImage < imgsUrls.length) setDisplayedImage((prev) => prev - 1);
  };

  return (
    <StyledImagesContainer>
      {!images.length ? (
        <STyledImagePreview>
          <h4>
            Your First selected image will appear here, and'll be the product
            profile image
          </h4>
        </STyledImagePreview>
      ) : (
        <>
          <StyledBigImage>
            <img crossOrigin="anynomos" src={imgsUrls[displayedImage]} alt="" />
          </StyledBigImage>
          <StyledImages>
            {imgsUrls.map((imgUrl, i) => (
              <div
                className={i === displayedImage ? "selected" : ""}
                key={i}
                onClick={() => setDisplayedImage(i)}
              >
                <button onClick={() => deleteImage(i)}>
                  <BsXCircle />
                </button>

                <img crossOrigin="anynomos" src={imgUrl} alt="" />
              </div>
            ))}
          </StyledImages>
        </>
      )}
    </StyledImagesContainer>
  );
};

export default Images;
