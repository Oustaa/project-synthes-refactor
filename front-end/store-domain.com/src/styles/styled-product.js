import styled from "styled-components";

export const StyledProduct = styled.div`
  max-width: 100%;
  max-width: 700px;
`;

export const StyledProductImage = styled.div`
  width: 100%;
  aspect-ratio: 1/0.6;
  background-color: var(--dark-400);
  border-radius: var(--radius-sm);
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 1/0.6;
    object-fit: cover;
  }
`;

export const StyledProductBody = styled.div`
  h2 {
    font-size: 1.2rem;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // max-width: 400px;
  }
  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
