import { useDispatch, useSelector } from "react-redux";
import localStorageUtils, { KeyStorage } from "../../../utils/local-storage";
import { changeAuth } from "./reducer";

function useAuth() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setAuth = (data) => {
    localStorageUtils.setObject(KeyStorage.AUTH, data);
    const actionChangeAuth = changeAuth(data);
    dispatch(actionChangeAuth);
  };

  return {
    auth,
    setAuth,
  };
}

export default useAuth;
