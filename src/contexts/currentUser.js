import React, {createContext, useReducer} from 'react';

const initialState = {
  isLoading: false,
  isLoggedIn: null, // null - не запросили данные
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {...state, isLoading: true};
    case 'SET_AUTHORIZED':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    case 'SET_UNAUTHORIZED':
      return {...state, isLoggedIn: false};
    case 'SET_ERROR':
      return {...state, isLoggedIn: false, isLoading: false, currentUser: null};
    case 'LOG_OUT':
      return {...initialState, isLoggedIn: false};
    default:
      return state;
  }
};

// в данном примере defaultValue не обязательно, но
// - наглядно показывает, что вообще мы внутри ожидаем;
// - если бы нужно было покрыть тестами - то задать дефолтное значение, это единственный вариант, чтобы протестить его в изоляции, без оборачивания в Provider
export const CurrentUserContext = createContext([{}, () => {}]);
export const CurrentUserProvider = ({children}) => {
  const value = useReducer(reducer, initialState);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};
