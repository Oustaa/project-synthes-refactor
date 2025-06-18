import React, { useEffect } from "react";
import { Outlet } from "react-router-dom/dist";

import { ClipLoader } from "react-spinners";
import { getStore } from "../../features/store-slice";
import Sidenav from "./sidenav/SideNav";
import NavBar from "./NavBar/NavBar";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const StyledLayout = styled.div`
  display: flex;
  main {
    width: 100vw;

    margin-inline-start: var(--spacing-lg);
    padding-right: var(--spacing-lg);
  }
`;

const StyledPending = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBody = styled.div`
  overflow-x: auto;
  max-height: calc(100vh - 80px - var(--spacing-lg));
  height: fit-content;

  position: relative;
  padding-right: var(--spacing-sm);
  margin-top: var(--spacing-lg);

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--dark-200);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--dark-500);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--dark-600);
  }

  & + & {
    margin-left: var(--spacing-lg);
  }
`;

const Layout = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(getStore());
  }, [dispatch]);

  if (loading)
    return (
      <StyledPending>
        <ClipLoader color="var(--primary)" size={80} />
      </StyledPending>
    );

  return (
    <StyledLayout>
      <Sidenav />
      <main>
        <NavBar />
        <StyledBody>
          <Outlet />
        </StyledBody>
      </main>
    </StyledLayout>
  );
};

export default Layout;
