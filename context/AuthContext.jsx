import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const register = (name, lastName, email, password) => {
    setIsLoading(true);
    setTimeout(() => {
      let userExampleInfo = [
        {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          access_token: "321321",
        },
      ];
      setUserInfo(userExampleInfo);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLoading(false);
    }, 500);
  };

  const login = (email, password) => {
    setIsLoading(true);
    setTimeout(() => {
      let userExampleInfo = [
        {
          email: email,
          password: password,
          access_token: "321321",
          role: "admin",
        },
      ];

      setUserInfo(userExampleInfo);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setIsLoading(true);

    setTimeout(() => {
      AsyncStorage.removeItem("userInfo");
      setUserInfo({});
      setIsLoading(false);
    }, 500);
  };

  const deletePost = (value) => {
    setDeleteModal(false);
    console.log(value);
  };

  const passValue = (value) => {
    setId(value);
  };

  const setLogin = () => {
    setIsLogin(true);
  };

  const setRegister = () => {
    setIsLogin(false);
  };

  const setDeleteModal = (value) => {
    setShowDeleteModal(value);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        register,
        login,
        logout,
        passValue,
        id,
        isLogin,
        setLogin,
        setRegister,
        showDeleteModal,
        setDeleteModal,
        deletePost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
