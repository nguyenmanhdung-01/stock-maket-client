export function cleanUpWhiteSpace(inputString) {
  const cleanedString = inputString.replace(/\s+/g, " ").trim();
  return cleanedString;
}

export const getRoleGroup = (auth) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return auth.userID?.RoleGroupID?.NhomQuyen;
};

export const getNhomQuyen = (auth) => {
  // console.log("getNhomQuyen", auth);
  return auth.userID?.RoleGroupID?.TenNhomQuyen;
};
