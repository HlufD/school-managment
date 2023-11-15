export const useLocalStorage = (key) => {
  const setValue = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  };
  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting data to local storage:", error);
    }
  };
  const removeValue = () => {
    localStorage.removeItem(key);
    try {
    } catch (error) {
      console.error("Error removing data from local storage:", error);
    }
  };
  return { setValue, getValue, removeValue };
};
