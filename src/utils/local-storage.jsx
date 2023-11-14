/* eslint-disable no-empty */
export const KeyStorage = {
  LOCALE: "locale",
  AUTH: "auth",
};

const localStorageUtils = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {}
    return false;
  },

  setObject: (key, value) => {
    try {
      const newValue = JSON.stringify(value);
      localStorage.setItem(key, newValue);
      return true;
    } catch (error) {}
    return false;
  },

  get: (key, defaultValue) => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return value;
      }
    } catch (error) {}
    return defaultValue;
  },

  getObject: (key, defaultValue = {}) => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const object = JSON.parse(value);
        return object || defaultValue;
      }
    } catch (error) {}
    return defaultValue;
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};

export default localStorageUtils;
