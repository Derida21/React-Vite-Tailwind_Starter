import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const Context = createContext({});

const getInitialState = () => {
  const storedAuth = localStorage.getItem("auth");
  let auth = {
    token: null,
    user: null,
  };

  if (storedAuth) {
    try {
      auth = JSON.parse(storedAuth);
    } catch (e) {
      console.error("Failed to parse auth from localStorage:", e);
    }
  }

  return {
    toggle: true,
    toggleNavbar: true,
    auth,
  };
};

const initialState = getInitialState();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOGGLE":
      return { ...state, toggle: action.payload };
    case "SET_TOGGLE_NAVBAR":
      return { ...state, toggleNavbar: action.payload };
    case "SET_AUTH":
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth && parsedAuth.token) {
        dispatch({ type: "SET_AUTH", payload: parsedAuth });
      }
    }
  }, []);

  useEffect(() => {
    if (state.auth && state.auth.token) {
      localStorage.setItem("auth", JSON.stringify(state.auth));
    }
  }, [state.auth]);

  const baseURL = 'http://nurul-huda.org/api/admin';

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (state.auth.token) {
        config.headers.Authorization = `Bearer ${state.auth.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <Context.Provider value={{ state, dispatch, axiosInstance }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
