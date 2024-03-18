// react hook
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components

import useAuth from "../hooks/redux/auth/useAuth";
import LoadingPage from "../components/LoadingPage";

const withUnAuthClient =
  ({ children }) =>
  () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
      if (auth && auth.token && Object.keys(auth).length > 0) {
        navigate("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    if (!auth || !auth?.token) {
      return <div>{children}</div>;
    }
    return <LoadingPage />;
  };

export default withUnAuthClient;
