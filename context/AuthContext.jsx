import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../config";
import axios from "axios";

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
    const ob = {
      firstname: name,
      lastname: lastName,
      email: email,
      password: password,
    };
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ob),
    })
      .then((res) => res.json())
      .then((res) => {
        login(res.email, res.password);
      })
      .catch((e) => alert(`error ${e}`));
    // setUserInfo(userExampleInfo);
    // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    setIsLoading(false);
  };

  const login = (email, password) => {
    setIsLoading(true);
    let ob = {
      email: email,
      password: password,
    };
    fetch(`${BASE_URL}/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ob),
    })
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((e) => alert(`Błąd: ${e}`));
    setIsLoading(false);
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
          author: userInfo.user._id,
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
