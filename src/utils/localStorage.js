/**
 * 对 chrome 中的 localStorage 进行 CRUD
 */

const checkStorage = (key) => {
  if (localStorage.getItem(key)) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      localStorage.removeItem(key);
      throw e;
    }
  }
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeStorage = (key) => localStorage.removeItem(key);

export {
  checkStorage,
  saveToStorage,
  removeStorage
};
