// react hook
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// components
import useAuth from "../hooks/redux/auth/useAuth";
import LoadingPage from "../components/LoadingPage";
import localStorageUtils, { KeyStorage } from "../utils/local-storage";
import ApiUtils from "../utils/api/api";
const Auth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  useEffect(() => {
    if (!auth || !auth.accessToken || !auth.accessToken.length < 0) {
      navigate(`/`);
      return;
    }
  }, [auth, location]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await ApiUtils.fetch("/auth/profile", null);
        if (res === undefined) {
          navigate(`/`);
          localStorageUtils.remove(KeyStorage.AUTH);
        }
      } catch (error) {
        console.log("errorss", error);
      }
    };
    fetch();
  }, [location]);
  if (auth?.accessToken) {
    return <div>{children}</div>;
  }
  return <LoadingPage active={true} opa={0.6} />;
};
export default Auth;
