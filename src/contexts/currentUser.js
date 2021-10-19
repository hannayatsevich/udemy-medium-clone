import React, {createContext, useState} from 'react';

// в данном примере defaultValue не обязательно, но
// - наглядно показывает, что вообще мы внутри ожидаем;
// - если бы нужно было покрыть тестами - то задать дефолтное значение, это единственный вариант, чтобы протестить его в изоляции, без оборачивания в Provider
export const CurrentUserContext = createContext([{}, () => {}]);
export const CurrentUserProvider = ({children}) => {
  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: null, // null - не запросили данные
    currentUser: null,
  });
  return (
    <CurrentUserContext.Provider value={[state, setState]}>
      {children}
    </CurrentUserContext.Provider>
  );
};
