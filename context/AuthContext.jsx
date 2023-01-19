import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);

  const register = (name, lastName, email, password) => {
    setIsLoading(true);
    setTimeout(() => {
      let userExampleInfo = [
        {
          name: name,
          lastName: lastName,
          email: email,
          user_id: 1,
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

  const login = (email, password) => {
    setIsLoading(true);
    setTimeout(() => {
      let userExampleInfo = [
        {
          email: email,
          name: "Kamil",
          user_id: 1,
          lastName: "Dębczak",
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

  const addSinglePost = (value) => {
    setIsLoading(true);
    setTimeout(() => {
      let data = [
        {
          text: value,
          author: userInfo[0].user_id,
          date: new Date(),
        },
      ];
      setIsLoading(false);
      setShowAddPost(false);
    }, 500);
  };

  const deletePost = (value) => {
    setDeleteModal(false);
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

  const setAddPost = (value) => {
    setShowAddPost(value);
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
        showAddPost,
        setAddPost,
        addSinglePost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
