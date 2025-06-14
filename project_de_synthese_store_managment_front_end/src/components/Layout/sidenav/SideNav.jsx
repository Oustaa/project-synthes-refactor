import React from "react";

import SideNavHeader from "./SideNavHeader";
import SideNavLinks from "./SideNavLinks";
import { StyledSidNav } from "../../../styles/styled-sideNav";
import { useSelector } from "react-redux";

const SideNav = () => {
  const { sideNavOpen } = useSelector((state) => state.ui);
  return (
    <StyledSidNav open={sideNavOpen}>
      <SideNavHeader sideNavOpen={sideNavOpen} />
      <SideNavLinks sideNavOpen={sideNavOpen} />
    </StyledSidNav>
  );
};

export default SideNav;
