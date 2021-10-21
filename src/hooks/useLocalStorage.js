import {useState, useEffect} from 'react';

const useLocalStorage = (localStorageKey, initialValue = '') => {
  const [localStorageValue, setLocalStorageValue] = useState(
    () => localStorage.getItem(localStorageKey) || initialValue
  ); //lazy initial value

  // const setStoredValue = value => {
  //   setLocalStorageValue(value)
  //   localStorage.setItem(localStorageKey, value)
  // }

  useEffect(() => {
    // if (!localStorageValue) return;

    localStorage.setItem(localStorageKey, localStorageValue);
  }, [localStorageKey, localStorageValue]);

  return [localStorageValue, setLocalStorageValue]; //экспортим прямо ф-ю, кот вернул useState
};

export default useLocalStorage;
