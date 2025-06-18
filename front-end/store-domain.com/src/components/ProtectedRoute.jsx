import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../features/auth-slice";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ to }) => {
  const dispatch = useDispatch();
  let { token } = useSelector((state) => state.auth);
  if (!token) {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    dispatch(login({ token }));
  }, [token, dispatch]);

  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={to || "login"} />
  );
};

export default ProtectedRoute;
