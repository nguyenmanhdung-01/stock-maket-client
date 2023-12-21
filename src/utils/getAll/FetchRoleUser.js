import ApiUtils from '../api/api';

export const FetchRoleUser = async () => {
  try {
    const res = await ApiUtils.fetch(`/phanQuyen`);
    return res.data;
  } catch (error) {
    console.log('errorss', error);
  }
};
