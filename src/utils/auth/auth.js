import localStorageUtils, { KeyStorage } from "../local-storage";

export const getTokenInfo = async () => {
  try {
    const tokenInfo = localStorageUtils.getObject(KeyStorage.AUTH, null);
    console.log("Token info", tokenInfo);
    if (tokenInfo && tokenInfo?.accessToken) {
      const timeRefreshToken = Date.now() + tokenInfo.expiresIn * 1000; // Thời gian gần hết hạn token (ví dụ: 1 phút trước khi hết hạn)
      const expireTime = tokenInfo.expiresAt || 0;

      return tokenInfo;
    }
  } catch (error) {
    setTokenInfo(null);
    return null;
  }
};

export const setTokenInfo = (tokenInfo) => {
  if (tokenInfo) {
    const expiresIn = Number(tokenInfo?.expiresIn) || 0;
    const expiresAt = Date.now() + expiresIn * 1000;

    localStorageUtils.setObject(KeyStorage.AUTH, {
      ...tokenInfo,
      expiresAt: expiresAt,
    });
  } else {
    // Xóa thông tin đăng nhập nếu không có thông tin token
    localStorageUtils.remove(KeyStorage.AUTH);
  }
};
