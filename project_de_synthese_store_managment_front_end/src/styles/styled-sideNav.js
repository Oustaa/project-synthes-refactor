import styled from "styled-components";

export const StyledSidNav = styled.aside`
  width: 300px;
  height: 100vh;
  background-color: var(--white);
  padding-inline: var(--spacing-lg);

  box-shadow: var(--boxShadow);
  top: 0;
  transition: transform 200ms ease-in;
  ${({ open }) => {
    if (!open) {
      return `
             width: 100px;
            `;
    }
  }};
`;

export const StyledHeader = styled.header`
  display: flex;
  text-align: center;
  ${({ open }) => {
    if (!open) {
      return `
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-block-start:var(--spacing-lg);

      & > * {
        width: 100%;
      }
      `;
    } else
      return `
        align-items: center;
        justify-content: space-between;
        color: var(--primary-blue-800);
        height: 70px;
    `;
  }}
  img {
    width: 100px;
  }
`;

export const StyledNavLinks = styled.div`
  margin-top: var(--spacing-xxl);
  a {
    padding: var(--spacing-sm);
    display: inline-block;
    width: 100%;
    color: var(--primary-dark-600);
    font-size: 1.1rem;
    font-weight: 300;

    &:hover,
    &:focus,
    &.active {
      color: var(--primary-dark);
      background-color: var(--dark-000);
      border-radius: var(--radius-sm);
      border: none !important;
    }
  }
`;

export const StyledNavLink = styled.span`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-content: ${({ open }) => (open ? "" : "center")};
  span {
    height: fit-content;
    display: ${({ open }) => (open ? "inline-block" : "none")};
  }

  svg {
    font-size: 1.7rem;
  }
`;
