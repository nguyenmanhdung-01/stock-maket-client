import localStorageUtils, { KeyStorage } from '../local-storage';

export const getTokenInfo = async () => {
  try {
    const tokenInfo = localStorageUtils.getObject(KeyStorage.AUTH, null);
    if (tokenInfo && tokenInfo?.accessToken) {
      const timeRefreshToken = Date.now() + 60 * 1000;
      const expireTime = tokenInfo.expiresAt || 0;
      if (timeRefreshToken < expireTime) {
        return { ...tokenInfo };
      } else {
        if (tokenInfo.refreshToken) {
          // const result = await refreshTokenApi({ refresh_token: tokenInfo?.refreshToken });
          // if (result) {
          //   const newTokenInfo: any = {
          //     accessToken: result.data.token,
          //     refreshToken: result.data.refresh_token,
          //     expiresAt: result.data.expires_at
          //   };
          //   setTokenInfo({ ...newTokenInfo });
          //   return newTokenInfo;
          // }
        }
      }
      return tokenInfo;
    }
  } catch (error) {
    setTokenInfo(null);
    return null;
  }
};

export const setTokenInfo = (tokenInfo) => {
  localStorageUtils.setObject(KeyStorage.AUTH, {
    ...tokenInfo,
    expiresAt: Date.now() + Number(tokenInfo?.expiresAt) * 1000,
  });
};
