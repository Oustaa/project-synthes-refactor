import styled from "styled-components";

export const StyledCategoriesContainer = styled.a`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: start;
  gap: var(--spacing-lg);
  padding-block: 6rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StyledCategory = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img {
    width: 140px;
    aspect-ratio: 1 / 1;
    background-color: var(--dark-500);
    border-radius: 50%;
    padding-bottom: var(--spacing-sm);
    overflow: hidden;
  }

  h2 {
    text-align: center;
    max-width: 100%;
  }
`;
