/*
 * localStorage tool
 *
 */
// deposit
const setItem = (key, str) => {
  localStorage.setItem(key, JSON.stringify(str));
};

// withdraw
const getItem = key => {
  return JSON.parse(localStorage.getItem(key));
};

// del removeItem

export { setItem, getItem };
